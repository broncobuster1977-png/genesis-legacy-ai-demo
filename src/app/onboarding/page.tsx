/* LEGACY AI ONBOARDING PAGE */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [soulFileGenerated, setSoulFileGenerated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Onboarding conversation steps
  const onboardingSteps = [
    "Hi! I'm your new AI assistant, and I'm here to get to know you personally. What should I call you, and what do you do for work?",
    "That's great! Tell me about your typical day - what kind of work challenges do you face, and how do you like to tackle problems?",
    "Interesting! What are you passionate about outside of work? What hobbies, interests, or activities energize you?",
    "I'd love to understand how you prefer to communicate. Are you more of a details person or big-picture thinker? Formal or casual?",
    "What are some of your goals - both professional and personal? What would you like to achieve in the next year?",
    "Finally, how would you like me to help you? What tasks, decisions, or areas of your life could benefit from an AI assistant?",
  ]

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    // Start onboarding conversation
    if (status === 'authenticated' && messages.length === 0) {
      const initialMessage: Message = {
        role: 'assistant',
        content: onboardingSteps[0],
        timestamp: new Date()
      }
      setMessages([initialMessage])
    }
  }, [status, messages.length, router])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user', 
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Check if we should move to next step or generate Soul File
      const nextStep = currentStep + 1
      
      if (nextStep < onboardingSteps.length) {
        // Continue with next onboarding question
        setTimeout(() => {
          const aiMessage: Message = {
            role: 'assistant',
            content: onboardingSteps[nextStep],
            timestamp: new Date()
          }
          setMessages(prev => [...prev, aiMessage])
          setCurrentStep(nextStep)
          setIsLoading(false)
        }, 1000) // Simulate thinking time
        
      } else {
        // Generate Soul File from conversation
        setTimeout(async () => {
          const completionMessage: Message = {
            role: 'assistant',
            content: "Perfect! I feel like I'm getting to know the real you. Let me process everything you've shared and create your personalized Soul File. This will help me remember who you are and how to best assist you in all our future conversations.\n\n*Processing your Soul File...*",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, completionMessage])

          // Simulate Soul File generation
          setTimeout(() => {
            const successMessage: Message = {
              role: 'assistant',
              content: "✨ Your Soul File is complete! I now have a comprehensive understanding of who you are, how you work, and how you like to communicate. I'll remember all of this in every conversation we have.\n\nYou can view and edit your Soul File anytime in Settings. Ready to start chatting?",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, successMessage])
            setSoulFileGenerated(true)
            setIsLoading(false)
          }, 3000)
        }, 1000)
      }

    } catch (error) {
      console.error('Onboarding error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const handleContinueToChat = () => {
    router.push('/chat')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-legacy-neutral flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-legacy-navy border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-legacy-neutral">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="legacy-logo text-2xl">LEGACY AI</h1>
            <p className="text-sm text-gray-600 mt-1">Getting to know you</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Step {Math.min(currentStep + 1, 6)} of 6
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-legacy-navy h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentStep + 1) / 6 * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-legacy-navy text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
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
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-6">
            {soulFileGenerated ? (
              <div className="text-center">
                <button
                  onClick={handleContinueToChat}
                  className="btn-legacy text-lg px-8 py-3"
                >
                  Continue to Chat →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share your thoughts..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-legacy-navy focus:border-transparent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-legacy-navy text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Send'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}