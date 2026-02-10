// API Client for reminder  hub Backend
const API_BASE_URL = 'http://localhost:8080/api/v1'

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

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
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
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      })

      // Get response text first
      const text = await response.text()
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      const isJson = contentType && contentType.includes('application/json')
      
      let data: any = {}
      
      if (isJson && text.trim()) {
        try {
          // Remove BOM if present and trim whitespace
          const cleanText = text.trim().replace(/^\uFEFF/, '')
          if (cleanText) {
            data = JSON.parse(cleanText)
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

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  async login(email: string, password: string) {
    return this.request<{ token: string; expiresIn: number }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async getCurrentUser() {
    return this.request<User>('/auth/me')
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
    return this.request<{
      reminders: Reminder[]
      pagination: {
        total: number
        limit: number
        offset: number
        hasMore: boolean
      }
    }>(`/reminders${query ? `?${query}` : ''}`)
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
