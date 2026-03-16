// API Client for reminder  hub Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1'
const AUTH_BASE_URL = '/auth'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export interface ApiError {
  code: string
  message: string
  details?: unknown
}

type CollectorTask = {
  id: string
  user_id: string
  email_id: string
  title: string
  description?: string
  deadline?: string
  status: 'pending' | 'completed' | 'overdue'
  priority?: string
  created_at: string
  updated_at: string
}

function mapTaskToReminder(task: CollectorTask): Reminder {
  const priority = task.priority === 'urgent' ? 'high' : (task.priority as Reminder['priority']) || 'medium'
  const dueDate = task.deadline && !task.deadline.startsWith('0001-01-01') ? task.deadline : ''

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate,
    status: task.status,
    priority,
    source: 'ai',
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  }
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.requestWithBase<T>(this.baseURL, endpoint, options)
  }

  private async requestWithBase<T>(
    baseURL: string,
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      let response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
      })

      // Get response text first
      let text = await response.text()
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      const isJson = contentType && contentType.includes('application/json')
      
      let data: any = {}
      
      if (isJson && text.trim()) {
        try {
          // Remove BOM if present and trim whitespace
          const cleanText = text.trim().replace(/^\uFEFF/, '')
          if (cleanText) {
            const parsed = JSON.parse(cleanText)
            data = parsed == null ? {} : parsed
          }
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError)
          console.error('Response text:', text.substring(0, 500))
          return {
            success: false,
            error: {
              code: 'PARSE_ERROR',
              message: `Invalid JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
              details: { responseText: text.substring(0, 200) },
            },
          }
        }
      } else if (!isJson && text) {
        // If not JSON, log and return error
        console.error('Non-JSON response:', {
          contentType,
          status: response.status,
          statusText: response.statusText,
          text: text.substring(0, 500),
        })
        return {
          success: false,
          error: {
            code: 'INVALID_RESPONSE',
            message: response.statusText || 'Server returned non-JSON response',
            details: { status: response.status, contentType, text: text.substring(0, 200) },
          },
        }
      }

      if (!response.ok && response.status === 401) {
        const refreshToken = this.getRefreshToken()
        if (refreshToken) {
          const refreshed = await this.refreshAccessToken(refreshToken)
          if (refreshed) {
            const retryHeaders = { ...headers, Authorization: `Bearer ${refreshed}` }
            response = await fetch(`${baseURL}${endpoint}`, { ...options, headers: retryHeaders })
            text = await response.text()

            // re-evaluate response data after retry
            const retryContentType = response.headers.get('content-type')
            const retryIsJson = retryContentType && retryContentType.includes('application/json')
            data = {}
            if (retryIsJson && text.trim()) {
              const cleanText = text.trim().replace(/^\uFEFF/, '')
              if (cleanText) {
                const parsed = JSON.parse(cleanText)
                data = parsed == null ? {} : parsed
              }
            }
          }
        }
      }

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.code || 'UNKNOWN_ERROR',
            message: data.error?.message || 'An error occurred',
            details: data.error?.details,
          },
        }
      }

      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      console.error('Request error:', error)
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      }
    }
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refresh_token')
  }

  private setToken(token: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem('auth_token', token)
  }

  private async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
      const data = await response.json().catch(() => null)
      const newToken = data?.access_token || data?.token
      if (response.ok && newToken) {
        this.setToken(newToken)
        return newToken
      }
      return null
    } catch {
      return null
    }
  }

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    return this.requestWithBase<{ message: string; user_id: string }>(AUTH_BASE_URL, '/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  async login(email: string, password: string) {
    return this.requestWithBase<{
      access_token: string
      refresh_token: string
      expires_in: number
      token_type: string
    }>(AUTH_BASE_URL, '/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async getCurrentUser() {
    return this.requestWithBase<User>(AUTH_BASE_URL, '/me')
  }

  // Reminder endpoints
  async getReminders(params?: {
    status?: string
    priority?: string
    source?: string
    messenger?: string
    limit?: number
    offset?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value))
        }
      })
    }
    const query = queryParams.toString()
    const response = await this.request<any[]>(`/reminders${query ? `?${query}` : ''}`)
    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data.map(mapTaskToReminder),
      }
    }
    return response as ApiResponse<Reminder[]>
  }

  async createReminder(reminder: CreateReminderRequest) {
    return this.request<{ reminder: Reminder }>('/reminders', {
      method: 'POST',
      body: JSON.stringify(reminder),
    })
  }

  async updateReminder(id: string, reminder: UpdateReminderRequest) {
    return this.request<Reminder>(`/reminders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reminder),
    })
  }

  async deleteReminder(id: string) {
    return this.request<{ message: string }>(`/reminders/${id}`, {
      method: 'DELETE',
    })
  }

  async completeReminder(id: string) {
    return this.request<{ reminder: { id: string; status: string; completedAt: string } }>(`/reminders/${id}/complete`, {
      method: 'POST',
    })
  }

  async getReminderStats(period?: string) {
    const query = period ? `?period=${period}` : ''
    return this.request<ReminderStats>(`/reminders/stats${query}`)
  }

  // Integration endpoints
  async getIntegrations() {
    return this.request<{
      integrations: Integration[]
      totalIntegrations: number
    }>('/integrations/messengers')
  }

  async createIntegration(integration: CreateIntegrationRequest) {
    return this.request<{ integration: Integration; webhookUrl?: string }>(
      '/integrations/messengers',
      {
        method: 'POST',
        body: JSON.stringify(integration),
      }
    )
  }

  async deleteIntegration(id: string) {
    return this.request<{ message: string }>(`/integrations/messengers/${id}`, {
      method: 'DELETE',
    })
  }

  async syncIntegration(id: string, params?: { from?: string; to?: string; chats?: string[] }) {
    return this.request<{
      syncId: string
      status: string
      estimatedDuration: number
    }>(`/integrations/messengers/${id}/sync`, {
      method: 'POST',
      body: JSON.stringify(params || {}),
    })
  }

  // AI endpoints
  async analyzeMessage(text: string, context?: Record<string, unknown>, language?: string) {
    return this.request<AIAnalysisResponse>('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ text, context, language: language || 'en' }),
    })
  }

  async getAIStats(period?: string) {
    const query = period ? `?period=${period}` : ''
    return this.request<AIStats>(`/ai/stats${query}`)
  }

  // User endpoints
  async updateProfile(profile: UpdateProfileRequest) {
    return this.request<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    })
  }

  async updatePreferences(preferences: UpdatePreferencesRequest) {
    return this.request<{ message: string }>('/users/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    })
  }

  // WebSocket status
  async getWebSocketStatus() {
    return this.request<{
      status: string
      totalConnections: number
      yourConnections: number
      uptime: number
      version: string
    }>('/websocket/status')
  }
}

// Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  subscription?: {
    plan: string
    expiresAt: string
    features: string[]
  }
  stats?: {
    totalReminders: number
    completedReminders: number
    activeIntegrations: number
  }
}

export interface Reminder {
  id: string
  title: string
  description?: string
  dueDate: string
  status: 'pending' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  source: 'manual' | 'messenger' | 'ai'
  aiMetadata?: {
    confidence: number
    extractedFrom: string
    model: string
  }
  messengerMetadata?: {
    platform: string
    chatName: string
    sender: string
    messageLink?: string
    extractedAt: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateReminderRequest {
  title: string
  description?: string
  dueDate: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  notifyBefore?: number
}

export interface UpdateReminderRequest {
  title?: string
  description?: string
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed'
}

export interface ReminderStats {
  summary: {
    totalTasks: number
    completedTasks: number
    pendingTasks: number
    overdueTasks: number
    completionRate: number
    avgResponseTime: number
  }
  aiExtraction?: {
    totalAnalyzed: number
    tasksExtracted: number
    avgConfidence: number
    autoCreated: number
  }
  byMessenger?: Array<{
    platform: string
    totalTasks: number
    completedTasks: number
    aiExtracted: number
  }>
  completionTrend?: Array<{
    date: string
    completed: number
    pending: number
    aiExtracted: number
  }>
}

export interface Integration {
  id: string
  platform: 'telegram' | 'slack' | 'discord' | 'whatsapp'
  username?: string
  status: 'connected' | 'disconnected' | 'error'
  monitoredChatsCount?: number
  tasksExtracted?: number
  lastMessageAt?: string
  settings?: Record<string, unknown>
  connectedAt: string
  lastSyncAt?: string
}

export interface CreateIntegrationRequest {
  platform: 'telegram' | 'slack' | 'discord' | 'whatsapp'
  credentials: {
    botToken?: string
    clientId?: string
    clientSecret?: string
  }
  settings?: {
    analyzePrivateChats?: boolean
    analyzeGroups?: boolean
    autoCreateReminders?: boolean
  }
}

export interface AIAnalysisResponse {
  hasTask: boolean
  extractedTask?: {
    title: string
    description?: string
    dueDate?: string
    priority?: 'low' | 'medium' | 'high'
    confidence: number
    keywords?: string[]
  }
  reasoning?: string
  processedAt: string
}

export interface AIStats {
  period: string
  totalAnalyzed: number
  tasksFound: number
  avgConfidence: number
  byPlatform?: Array<{
    platform: string
    analyzed: number
    tasksFound: number
    confidence: number
  }>
  confidenceDistribution?: {
    high: number
    medium: number
    low: number
  }
}

export interface UpdateProfileRequest {
  name?: string
  bio?: string
  avatar?: string
  timezone?: string
}

export interface UpdatePreferencesRequest {
  theme?: string
  language?: string
  timezone?: string
  notifications?: {
    email?: boolean
    push?: boolean
    websocket?: boolean
    weeklyReport?: boolean
    reminderBefore?: number
  }
  ai?: {
    autoExtract?: boolean
    minConfidence?: number
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL)
