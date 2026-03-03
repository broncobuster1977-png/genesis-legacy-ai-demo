/* LEGACY AI MAIN CHAT PAGE */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  id: string
}

interface Conversation {
  id: string
  title: string
  lastMessage: string
  updatedAt: Date
}

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [voiceActive, setVoiceActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    // Load conversations on mount
    if (status === 'authenticated') {
      loadConversations()
    }
  }, [status, router])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadConversations = async () => {
    try {
      // TODO: Replace with actual API call
      // Placeholder data for now
      const mockConversations: Conversation[] = [
        {
          id: '1',
          title: 'Getting Started',
          lastMessage: 'How can I help you today?',
          updatedAt: new Date()
        }
      ]
      setConversations(mockConversations)
    } catch (error) {
      console.error('Failed to load conversations:', error)
    }
  }

  const startNewConversation = () => {
    setMessages([])
    setCurrentConversationId(null)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Hi ${session?.user?.name || 'there'}! I'm your personal AI assistant. I know you from our previous conversations and I'm here to help with anything you need. What would you like to talk about today?`,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsStreaming(true)

    // Create abort controller for this request
    abortControllerRef.current = new AbortController()

    try {
      // TODO: Replace with actual streaming API call
      // Simulate streaming response for now
      const aiMessageId = (Date.now() + 1).toString()
      let aiMessage: Message = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Simulate streaming
      const response = "I understand you'd like to discuss that topic. Based on what I know about you from your Soul File, I think this connects to your interests in [relevant area]. Let me provide some thoughtful insights...\n\nThis is a simulated response that demonstrates the streaming interface. In the real application, this would be a live response from Claude that knows your personal context and communication style.\n\nIs there a specific aspect you'd like to explore further?"
      
      for (let i = 0; i < response.length; i += 3) {
        if (abortControllerRef.current?.signal.aborted) break
        
        const chunk = response.slice(0, i + 3)
        aiMessage = { ...aiMessage, content: chunk }
        
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? aiMessage : msg
        ))
        
        await new Promise(resolve => setTimeout(resolve, 50))
      }

    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Chat error:', error)
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant', 
          content: "I'm sorry, I encountered an error. Please try again.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setIsLoading(false)
    setIsStreaming(false)
  }

  const toggleVoice = () => {
    setVoiceActive(!voiceActive)
    // TODO: Integrate with LiveKit voice system
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-legacy-neutral flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-legacy-navy border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-legacy-neutral flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h1 className="legacy-logo text-xl">LEGACY AI</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={startNewConversation}
              className="w-full btn-legacy-outline py-3 px-4 text-sm"
            >
              + New Conversation
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Conversations</h3>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setCurrentConversationId(conv.id)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                    currentConversationId === conv.id ? 'bg-legacy-navy/10 border border-legacy-navy/20' : ''
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900 mb-1 truncate">
                    {conv.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {conv.lastMessage}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {conv.updatedAt.toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-legacy-navy rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {session?.user?.email}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/settings"
                className="flex-1 text-center py-2 px-3 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Settings
              </Link>
              <button
                onClick={() => signOut()}
                className="flex-1 text-center py-2 px-3 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="font-semibold text-gray-900">
                {currentConversationId ? 'Conversation' : 'New Chat'}
              </h1>
              <p className="text-sm text-gray-500">
                AI assistant with your personal context
              </p>
            </div>
          </div>

          {/* Voice Toggle */}
          <button
            onClick={toggleVoice}
            className={`p-3 rounded-full transition-all duration-200 ${
              voiceActive 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Welcome back!
                </h2>
                <p className="text-gray-600 mb-6">
                  I'm your personal AI assistant. I remember our previous conversations and I'm ready to help with anything you need.
                </p>
                <button 
                  onClick={startNewConversation}
                  className="btn-legacy px-6 py-3"
                >
                  Start Chatting
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md xl:max-w-2xl px-6 py-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-legacy-navy text-white' 
                      : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-3 ${
                      message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={voiceActive ? "Tap microphone to speak..." : "Type your message..."}
                disabled={isLoading || voiceActive}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-legacy-navy focus:border-transparent disabled:opacity-50"
              />
              
              {isStreaming ? (
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={(!input.trim() && !voiceActive) || isLoading}
                  className="bg-legacy-navy text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              )}
            </form>
            
            {isStreaming && (
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-legacy-navy rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-legacy-navy rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-legacy-navy rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span>AI is responding...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}