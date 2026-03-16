"use client"

import { api, type User } from "./api"
import { wsClient } from "./websocket"

// Authentication utilities
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("auth_token")
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    wsClient.disconnect()
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("refresh_token")
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
    // Connect WebSocket with new token
    wsClient.connect(token)
  }
}

export function setRefreshToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("refresh_token", token)
  }
}

// Get current user from API
export async function getCurrentUser(): Promise<User | null> {
  if (!isAuthenticated()) return null

  try {
    const response = await api.getCurrentUser()
    if (response.success && response.data) {
      return response.data
    }
    return null
  } catch (error) {
    console.error("Failed to get current user:", error)
    return null
  }
}

// Login function
export async function login(email: string, password: string) {
  const response = await api.login(email, password)
  const token = response.data?.access_token
  const refresh = response.data?.refresh_token
  if (response.success && token) {
    setAuthToken(token)
    if (refresh) setRefreshToken(refresh)
    return { success: true, token }
  }
  return {
    success: false,
    error: response.error?.message || "Login failed",
  }
}

// Register function
export async function register(email: string, password: string, name: string) {
  const response = await api.register(email, password, name)
  if (response.success) {
    // Auth service doesn't return a token on register; perform login
    return login(email, password)
  }
  return {
    success: false,
    error: response.error?.message || "Registration failed",
  }
}
