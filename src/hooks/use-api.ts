/* LEGACY AI API HOOKS */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Generic API hook
export function useApi<T>(
  endpoint: string,
  options: RequestInit = {}
): ApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  const fetchData = useCallback(async () => {
    if (!session) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [endpoint, options, session])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Soul File specific hook
interface SoulFileData {
  soulFile?: any;
  lastUpdated?: string;
}

export function useSoulFile() {
  const { data, loading, error, refetch } = useApi('/api/soul-file') as { data: SoulFileData, loading: boolean, error: any, refetch: () => void }
  
  const updateSoulFile = useCallback(async (soulFile: any) => {
    try {
      const response = await fetch('/api/soul-file', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ soulFile })
      })

      if (!response.ok) {
        throw new Error('Failed to update Soul File')
      }

      await refetch()
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }, [refetch])

  const deleteSoulFile = useCallback(async () => {
    try {
      const response = await fetch('/api/soul-file', {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete Soul File')
      }

      await refetch()
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }, [refetch])

  return {
    soulFile: data?.soulFile,
    lastUpdated: data?.lastUpdated,
    loading,
    error,
    refetch,
    updateSoulFile,
    deleteSoulFile
  }
}

// Conversations hook
interface ConversationsData {
  conversations?: any[];
  totalCount?: number;
  hasMore?: boolean;
}

export function useConversations() {
  const { data, loading, error, refetch } = useApi('/api/conversations') as { data: ConversationsData, loading: boolean, error: any, refetch: () => void }

  const createConversation = useCallback(async (title: string, type = 'CHAT') => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, type })
      })

      if (!response.ok) {
        throw new Error('Failed to create conversation')
      }

      const newConversation = await response.json()
      await refetch()
      return { success: true, conversation: newConversation }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }, [refetch])

  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      const response = await fetch(`/api/conversations?conversationId=${conversationId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete conversation')
      }

      await refetch()
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }, [refetch])

  return {
    conversations: data?.conversations || [],
    totalCount: data?.totalCount || 0,
    hasMore: data?.hasMore || false,
    loading,
    error,
    refetch,
    createConversation,
    deleteConversation
  }
}

// Streaming chat hook
export function useStreamingChat() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')

  const sendMessage = useCallback(async (
    message: string,
    conversationId?: string,
    onChunk?: (chunk: string) => void,
    onComplete?: (fullResponse: string) => void,
    onError?: (error: string) => void
  ) => {
    try {
      setIsStreaming(true)
      setStreamingMessage('')

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          conversationId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No reader available')
      }

      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.content) {
                fullResponse += data.content
                setStreamingMessage(fullResponse)
                onChunk?.(data.content)
              }
              
              if (data.done) {
                onComplete?.(fullResponse)
                setIsStreaming(false)
                return
              }
              
              if (data.error) {
                throw new Error(data.error)
              }
            } catch (parseError) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      onError?.(errorMessage)
      setIsStreaming(false)
    }
  }, [])

  const stopStreaming = useCallback(() => {
    setIsStreaming(false)
    setStreamingMessage('')
  }, [])

  return {
    sendMessage,
    stopStreaming,
    isStreaming,
    streamingMessage
  }
}