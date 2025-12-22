# Reminder Hub API Documentation

## Overview

Reminder Hub is an AI-powered task management system that automatically analyzes messenger conversations, extracts commitments and deadlines, and transforms them into intelligent reminders.

**Base URL:** `https://api.reminderhub.com`

**API Version:** `v1`

**Authentication:** JWT Bearer Token (required for all endpoints except registration and login)

---

## Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Messenger Integrations](#messenger-integrations)
4. [Reminders Management](#reminders-management)
5. [Analytics & Statistics](#analytics--statistics)
6. [Webhooks](#webhooks)
7. [Error Handling](#error-handling)
8. [Rate Limiting](#rate-limiting)

---

## Authentication

All API requests (except registration and login) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Register

Create a new user account.

**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123abc",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2025-01-15T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

Authenticate and receive a JWT token.

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

### Get Current User

Retrieve information about the authenticated user.

**Endpoint:** `GET /api/v1/auth/me`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_123abc",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "avatar": "https://cdn.reminderhub.com/avatars/user_123abc.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "subscription": {
      "plan": "premium",
      "expiresAt": "2026-01-01T00:00:00Z"
    }
  }
}
```

---

## User Management

### Update Profile

Update user profile information.

**Endpoint:** `PUT /api/v1/users/profile`

**Request Body:**
```json
{
  "name": "John Smith",
  "bio": "Product manager and AI enthusiast",
  "avatar": "base64_encoded_image_data"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123abc",
      "name": "John Smith",
      "email": "john.doe@example.com",
      "bio": "Product manager and AI enthusiast",
      "avatar": "https://cdn.reminderhub.com/avatars/user_123abc.jpg"
    }
  }
}
```

### Update Preferences

Update application preferences.

**Endpoint:** `PUT /api/v1/users/preferences`

**Request Body:**
```json
{
  "theme": "dark",
  "language": "en",
  "timezone": "UTC-5",
  "notifications": {
    "email": true,
    "push": true,
    "weeklyReport": false
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Preferences updated successfully"
}
```

---

## Messenger Integrations

### List Integrations

Retrieve all connected messenger integrations.

**Endpoint:** `GET /api/v1/integrations/messengers`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "id": "int_msg_123",
        "platform": "telegram",
        "username": "@reminder_bot",
        "status": "connected",
        "monitoredChatsCount": 12,
        "tasksExtracted": 85,
        "settings": {
          "analyzePrivateChats": true,
          "analyzeGroups": true
        },
        "connectedAt": "2025-01-01T00:00:00Z",
        "lastSyncAt": "2025-01-15T10:00:00Z"
      },
      {
        "id": "int_msg_456",
        "platform": "slack",
        "username": "Tech Team Workspace",
        "status": "connected",
        "monitoredChatsCount": 8,
        "tasksExtracted": 42,
        "settings": {
          "analyzePrivateChats": true,
          "analyzeGroups": true
        },
        "connectedAt": "2025-01-05T00:00:00Z",
        "lastSyncAt": "2025-01-15T09:45:00Z"
      }
    ],
    "totalIntegrations": 2
  }
}
```

### Create Integration

Connect a new messenger platform.

**Endpoint:** `POST /api/v1/integrations/messengers`

**Supported Platforms:** `telegram`, `whatsapp`, `slack`, `discord`

**Request Body (Telegram Example):**
```json
{
  "platform": "telegram",
  "credentials": {
    "botToken": "123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
  },
  "settings": {
    "analyzePrivateChats": true,
    "analyzeGroups": true
  }
}
```

**Request Body (Slack Example):**
```json
{
  "platform": "slack",
  "credentials": {
    "accessToken": "xoxb-1234567890-abcdef",
    "workspaceId": "T123ABC456"
  },
  "settings": {
    "analyzePrivateChats": true,
    "analyzeGroups": true
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "integration": {
      "id": "int_msg_789",
      "platform": "telegram",
      "username": "@reminder_bot",
      "status": "connected",
      "monitoredChatsCount": 0,
      "tasksExtracted": 0,
      "settings": {
        "analyzePrivateChats": true,
        "analyzeGroups": true
      },
      "connectedAt": "2025-01-15T10:30:00Z"
    }
  }
}
```

### Update Integration Settings

Modify settings for an existing integration.

**Endpoint:** `PUT /api/v1/integrations/messengers/:integrationId`

**Request Body:**
```json
{
  "settings": {
    "analyzePrivateChats": false,
    "analyzeGroups": true
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "integration": {
      "id": "int_msg_123",
      "platform": "telegram",
      "settings": {
        "analyzePrivateChats": false,
        "analyzeGroups": true
      },
      "updatedAt": "2025-01-15T11:00:00Z"
    }
  }
}
```

### Delete Integration

Disconnect a messenger platform.

**Endpoint:** `DELETE /api/v1/integrations/messengers/:integrationId`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Integration deleted successfully"
}
```

---

## Reminders Management

### List Reminders

Retrieve all reminders with optional filtering.

**Endpoint:** `GET /api/v1/reminders`

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `completed`, `overdue`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `messenger` (optional): Filter by platform (`telegram`, `slack`, `whatsapp`, `discord`)
- `limit` (optional): Number of results per page (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Example:** `GET /api/v1/reminders?status=pending&priority=high&limit=20`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reminders": [
      {
        "id": "rem_abc123",
        "title": "Созвон по дизайну",
        "description": "Обсудить правки из чата с Артемом",
        "dueDate": "2025-01-15T10:00:00Z",
        "status": "pending",
        "priority": "high",
        "source": "messenger",
        "messengerMetadata": {
          "platform": "telegram",
          "chatName": "Design Team",
          "sender": "@artem_designer",
          "messageLink": "https://t.me/c/123/456",
          "extractedAt": "2025-01-14T15:30:00Z"
        },
        "createdAt": "2025-01-14T15:30:00Z",
        "updatedAt": "2025-01-14T15:30:00Z"
      },
      {
        "id": "rem_def456",
        "title": "Submit quarterly report",
        "description": "Complete Q4 financial analysis",
        "dueDate": "2025-01-20T17:00:00Z",
        "status": "pending",
        "priority": "high",
        "source": "manual",
        "messengerMetadata": null,
        "createdAt": "2025-01-10T09:00:00Z",
        "updatedAt": "2025-01-10T09:00:00Z"
      }
    ],
    "pagination": {
      "total": 145,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### Get Single Reminder

Retrieve details of a specific reminder.

**Endpoint:** `GET /api/v1/reminders/:reminderId`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reminder": {
      "id": "rem_abc123",
      "title": "Созвон по дизайну",
      "description": "Обсудить правки из чата с Артемом",
      "dueDate": "2025-01-15T10:00:00Z",
      "status": "pending",
      "priority": "high",
      "source": "messenger",
      "messengerMetadata": {
        "platform": "telegram",
        "chatName": "Design Team",
        "sender": "@artem_designer",
        "messageLink": "https://t.me/c/123/456",
        "extractedAt": "2025-01-14T15:30:00Z"
      },
      "createdAt": "2025-01-14T15:30:00Z",
      "updatedAt": "2025-01-14T15:30:00Z"
    }
  }
}
```

### Create Reminder (Manual)

Manually create a new reminder.

**Endpoint:** `POST /api/v1/reminders`

**Request Body:**
```json
{
  "title": "Team meeting preparation",
  "description": "Prepare slides and agenda for weekly sync",
  "dueDate": "2025-01-16T09:00:00Z",
  "priority": "medium"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "reminder": {
      "id": "rem_xyz789",
      "title": "Team meeting preparation",
      "description": "Prepare slides and agenda for weekly sync",
      "dueDate": "2025-01-16T09:00:00Z",
      "status": "pending",
      "priority": "medium",
      "source": "manual",
      "messengerMetadata": null,
      "createdAt": "2025-01-15T11:00:00Z",
      "updatedAt": "2025-01-15T11:00:00Z"
    }
  }
}
```

### Update Reminder

Modify an existing reminder.

**Endpoint:** `PUT /api/v1/reminders/:reminderId`

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2025-01-17T14:00:00Z",
  "priority": "high"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reminder": {
      "id": "rem_xyz789",
      "title": "Updated title",
      "description": "Updated description",
      "dueDate": "2025-01-17T14:00:00Z",
      "status": "pending",
      "priority": "high",
      "source": "manual",
      "messengerMetadata": null,
      "updatedAt": "2025-01-15T11:30:00Z"
    }
  }
}
```

### Complete Reminder

Mark a reminder as completed.

**Endpoint:** `POST /api/v1/reminders/:reminderId/complete`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reminder": {
      "id": "rem_abc123",
      "status": "completed",
      "completedAt": "2025-01-15T12:00:00Z"
    }
  }
}
```

### Delete Reminder

Permanently delete a reminder.

**Endpoint:** `DELETE /api/v1/reminders/:reminderId`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Reminder deleted successfully"
}
```

---

## Analytics & Statistics

### Get Dashboard Statistics

Retrieve comprehensive analytics about tasks and productivity.

**Endpoint:** `GET /api/v1/reminders/stats`

**Query Parameters:**
- `period` (optional): Time period for stats (`week`, `month`, `quarter`, `year`, default: `month`)
- `timezone` (optional): User timezone (default: `UTC`)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalTasks": 170,
      "completedTasks": 145,
      "pendingTasks": 20,
      "overdueTasks": 5,
      "completionRate": 85,
      "avgResponseTime": 42
    },
    "byMessenger": [
      {
        "platform": "telegram",
        "totalTasks": 85,
        "completedTasks": 72,
        "pendingTasks": 10,
        "overdueTasks": 3,
        "completionRate": 85
      },
      {
        "platform": "slack",
        "totalTasks": 42,
        "completedTasks": 36,
        "pendingTasks": 5,
        "overdueTasks": 1,
        "completionRate": 86
      },
      {
        "platform": "whatsapp",
        "totalTasks": 28,
        "completedTasks": 24,
        "pendingTasks": 3,
        "overdueTasks": 1,
        "completionRate": 86
      },
      {
        "platform": "discord",
        "totalTasks": 15,
        "completedTasks": 13,
        "pendingTasks": 2,
        "overdueTasks": 0,
        "completionRate": 87
      }
    ],
    "responseTrend": {
      "current": 42,
      "previous": 50,
      "change": -16,
      "trend": "improving"
    },
    "completionTrend": [
      {
        "date": "2025-01-01",
        "completed": 10,
        "pending": 5
      },
      {
        "date": "2025-01-02",
        "completed": 12,
        "pending": 4
      }
    ],
    "priorityDistribution": {
      "high": 35,
      "medium": 45,
      "low": 20
    }
  }
}
```

---

## Webhooks

Subscribe to real-time events from Reminder Hub.

### Supported Events

- `reminder.extracted` - AI extracted a new task from a message
- `reminder.created` - A new reminder was created
- `reminder.completed` - A reminder was marked as completed
- `reminder.overdue` - A reminder became overdue
- `messenger.connected` - New messenger integration connected
- `messenger.disconnected` - Messenger integration lost connection

### Create Webhook

**Endpoint:** `POST /api/v1/webhooks`

**Request Body:**
```json
{
  "url": "https://your-domain.com/webhook-endpoint",
  "events": ["reminder.extracted", "reminder.overdue"],
  "secret": "your_webhook_secret_key"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "webhook": {
      "id": "whk_abc123",
      "url": "https://your-domain.com/webhook-endpoint",
      "events": ["reminder.extracted", "reminder.overdue"],
      "status": "active",
      "createdAt": "2025-01-15T12:00:00Z"
    }
  }
}
```

### Webhook Payload Example

When an event occurs, Reminder Hub sends a POST request to your webhook URL:

```json
{
  "event": "reminder.extracted",
  "timestamp": "2025-01-15T12:30:00Z",
  "data": {
    "reminderId": "rem_abc123",
    "extractedFrom": "telegram",
    "chatName": "Design Team",
    "sender": "@artem_designer",
    "text": "Скинь презентацию до завтра",
    "extractedTask": {
      "title": "Скинь презентацию",
      "dueDate": "2025-01-16T00:00:00Z",
      "priority": "medium"
    }
  },
  "signature": "sha256=abc123def456..."
}
```

### Webhook Signature Verification

All webhook payloads include a signature in the `X-Webhook-Signature` header. Verify it using HMAC SHA-256:

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password is incorrect",
    "details": {}
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Authentication failed |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `INTEGRATION_ERROR` | 502 | Messenger platform connection failed |

---

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Authenticated users:** 1000 requests per hour
- **Unauthenticated requests:** 100 requests per hour

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1642262400
```

When the limit is exceeded, you'll receive a `429 Too Many Requests` response:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 15 minutes.",
    "retryAfter": 900
  }
}
```

---

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.reminderhub.com/api/v1',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  }
});

// List reminders
const reminders = await client.get('/reminders', {
  params: { status: 'pending', limit: 20 }
});

// Create reminder
const newReminder = await client.post('/reminders', {
  title: 'Complete documentation',
  description: 'Finish API docs',
  dueDate: '2025-01-20T17:00:00Z',
  priority: 'high'
});

// Complete reminder
await client.post(`/reminders/${reminderId}/complete`);
```

### Python

```python
import requests

BASE_URL = 'https://api.reminderhub.com/api/v1'
HEADERS = {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
}

# List reminders
response = requests.get(
    f'{BASE_URL}/reminders',
    headers=HEADERS,
    params={'status': 'pending', 'limit': 20}
)
reminders = response.json()

# Create reminder
response = requests.post(
    f'{BASE_URL}/reminders',
    headers=HEADERS,
    json={
        'title': 'Complete documentation',
        'description': 'Finish API docs',
        'dueDate': '2025-01-20T17:00:00Z',
        'priority': 'high'
    }
)
new_reminder = response.json()

# Complete reminder
requests.post(
    f'{BASE_URL}/reminders/{reminder_id}/complete',
    headers=HEADERS
)
```

---

## Support

- **Documentation:** https://docs.reminderhub.com
- **Status Page:** https://status.reminderhub.com
- **Support Email:** support@reminderhub.com
- **Discord Community:** https://discord.gg/reminderhub

**Last Updated:** December 22, 2025
**API Version:** v1.0.0
