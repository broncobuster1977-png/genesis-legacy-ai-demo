'use client'

import { useState, useEffect } from 'react'
import { GenesisCommandConsole } from '@/components/demo/genesis-command-console'

export default function DemoPage() {
  const [accessCode, setAccessCode] = useState<string>('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  // Generate session access code
  useEffect(() => {
    const generateAccessCode = () => {
      const timestamp = Date.now().toString().slice(-4)
      return `GLI-2024-${timestamp}`
    }
    setAccessCode(generateAccessCode())
  }, [])

  const handleAccessCodeEntry = async (enteredCode: string) => {
    setIsLoading(true)
    
    // Simulate code validation (in real app, validate against backend)
    setTimeout(() => {
      if (enteredCode === accessCode || enteredCode === 'GLI-2024-ALPHA') {
        setIsAuthorized(true)
      }
      setIsLoading(false)
    }, 1500)
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C]/20 via-transparent to-[#2E75B6]/20"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Access Control */}
        <div className="relative z-10 w-full max-w-md p-8">
          <div className="bg-gradient-to-br from-[#1e293b]/90 to-[#334155]/80 border-2 border-[#3b82f6]/30 rounded-3xl p-8 backdrop-blur-xl">
            {/* Genesis Logo */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-2xl flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z"/>
                  <circle cx="35" cy="35" r="3"/>
                  <circle cx="50" cy="30" r="3"/>
                  <circle cx="65" cy="35" r="3"/>
                  <circle cx="40" cy="50" r="3"/>
                  <circle cx="60" cy="50" r="3"/>
                  <circle cx="50" cy="65" r="3"/>
                  <path d="M35 35L50 30M50 30L65 35M35 35L40 50M65 35L60 50M40 50L50 65M60 50L50 65M40 50L60 50" strokeWidth="2" opacity="0.8"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                GENESIS LEGACY AI
              </h1>
              <p className="text-[#64b5f6] uppercase tracking-wider text-sm font-semibold">
                Secure Access Required
              </p>
            </div>

            {/* Access Code Entry */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3">Authorization Code</label>
                <input
                  type="text"
                  placeholder="Enter access code..."
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border-2 border-[#3b82f6]/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#10b981] transition-colors backdrop-blur-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAccessCodeEntry((e.target as HTMLInputElement).value)
                    }
                  }}
                />
              </div>
              
              <div className="bg-[#0f172a]/40 p-4 rounded-xl border border-[#3b82f6]/20">
                <p className="text-sm text-gray-300 mb-2">Demo Access Code:</p>
                <p className="text-[#10b981] font-mono font-bold text-lg tracking-wider">{accessCode}</p>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-[#3b82f6]/30 border-t-[#3b82f6] rounded-full animate-spin"></div>
                  <span className="ml-3 text-white">Validating access...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <GenesisCommandConsole accessCode={accessCode} />
}