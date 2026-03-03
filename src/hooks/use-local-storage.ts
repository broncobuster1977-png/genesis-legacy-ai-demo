/* LEGACY AI LOCAL STORAGE HOOK */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize state with value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Save state
      setStoredValue(valueToStore)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// Hook for managing user preferences
export function useUserPreferences() {
  return useLocalStorage('legacy-ai-preferences', {
    theme: 'light',
    voiceEnabled: true,
    notifications: true,
    autoSave: true,
    streamingResponses: true
  })
}

// Hook for managing chat settings
export function useChatSettings() {
  return useLocalStorage('legacy-ai-chat-settings', {
    sidebarOpen: true,
    fontSize: 'medium',
    sendOnEnter: true,
    showTimestamps: true
  })
}