"use client"

// Mock authentication utilities
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("auth_token")
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

// Mock user data
export function getCurrentUser() {
  if (!isAuthenticated()) return null

  return {
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
    createdAt: "2024-12-01T00:00:00Z",
  }
}
