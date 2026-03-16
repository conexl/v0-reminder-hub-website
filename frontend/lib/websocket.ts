// WebSocket client for real-time updates
// Leave unset by default to avoid crashing the app when WS backend is not configured.
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || ''

export interface WebSocketMessage {
  type: 'event' | 'notification' | 'system' | 'pong'
  event?: string
  data?: unknown
  timestamp?: string
  metadata?: {
    source?: string
  }
}

export type WebSocketEventHandler = (message: WebSocketMessage) => void

class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private token: string | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private eventHandlers: Map<string, Set<WebSocketEventHandler>> = new Map()
  private isConnecting = false
  private shouldReconnect = true

  constructor(baseURL: string) {
    this.url = baseURL
  }

  connect(token: string) {
    if (!this.url) {
      return
    }
    if (this.ws?.readyState === WebSocket.OPEN) {
      return
    }

    if (this.isConnecting) {
      return
    }

    this.token = token
    this.isConnecting = true
    this.shouldReconnect = true

    try {
      const wsUrl = `${this.url}?token=${encodeURIComponent(token)}`
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected')
        this.isConnecting = false
        this.reconnectAttempts = 0

        // Subscribe to default events
        this.subscribe(['reminder.created', 'reminder.updated', 'reminder.completed', 'task.extracted'])
      }

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (error) {
          console.error('[WebSocket] Failed to parse message:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('[WebSocket] Error:', error)
        this.isConnecting = false
      }

      this.ws.onclose = () => {
        console.log('[WebSocket] Disconnected')
        this.isConnecting = false
        this.ws = null

        if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++
          const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
          console.log(`[WebSocket] Reconnecting in ${delay}ms... (attempt ${this.reconnectAttempts})`)
          setTimeout(() => this.connect(token), delay)
        }
      }
    } catch (error) {
      console.error('[WebSocket] Connection failed:', error)
      this.isConnecting = false
    }
  }

  disconnect() {
    this.shouldReconnect = false
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.eventHandlers.clear()
  }

  subscribe(events: string[]) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'subscribe',
          events,
        })
      )
    }
  }

  unsubscribe(events: string[]) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'unsubscribe',
          events,
        })
      )
    }
  }

  on(event: string, handler: WebSocketEventHandler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set())
    }
    this.eventHandlers.get(event)!.add(handler)

    return () => {
      const handlers = this.eventHandlers.get(event)
      if (handlers) {
        handlers.delete(handler)
        if (handlers.size === 0) {
          this.eventHandlers.delete(event)
        }
      }
    }
  }

  off(event: string, handler: WebSocketEventHandler) {
    const handlers = this.eventHandlers.get(event)
    if (handlers) {
      handlers.delete(handler)
    }
  }

  private handleMessage(message: WebSocketMessage) {
    // Handle pong
    if (message.type === 'pong') {
      return
    }

    // Handle ping
    if (message.type === 'system' && (message as unknown as { type: string }).type === 'ping') {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'pong' }))
      }
      return
    }

    // Call event handlers
    if (message.event) {
      const handlers = this.eventHandlers.get(message.event)
      if (handlers) {
        handlers.forEach((handler) => {
          try {
            handler(message)
          } catch (error) {
            console.error(`[WebSocket] Error in handler for ${message.event}:`, error)
          }
        })
      }

      // Also call wildcard handlers
      const wildcardHandlers = this.eventHandlers.get('*')
      if (wildcardHandlers) {
        wildcardHandlers.forEach((handler) => {
          try {
            handler(message)
          } catch (error) {
            console.error('[WebSocket] Error in wildcard handler:', error)
          }
        })
      }
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

// Export singleton instance
export const wsClient = new WebSocketClient(WS_BASE_URL)
