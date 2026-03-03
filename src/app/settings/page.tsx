/* LEGACY AI SETTINGS PAGE */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SoulFile {
  personalInfo: {
    name?: string
    occupation?: string
    interests?: string[]
    location?: string
  }
  communicationStyle: {
    formality?: string
    tone?: string
    preferredLength?: string
  }
  workContext: {
    industry?: string
    role?: string
    challenges?: string[]
    goals?: string[]
  }
  personalContext: {
    family?: string
    hobbies?: string[]
    values?: string[]
    goals?: string[]
  }
  aiPreferences: {
    helpWith?: string[]
    avoidTopics?: string[]
    communicationPrefs?: string
  }
}

interface UsageStats {
  totalConversations: number
  totalMessages: number
  tokensUsed: number
  estimatedCost: number
  avgResponseTime: number
  lastActive: Date
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [soulFile, setSoulFile] = useState<SoulFile | null>(null)
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [preferences, setPreferences] = useState({
    theme: 'light',
    voiceEnabled: true,
    notifications: true,
    autoSave: true,
    streamingResponses: true
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      loadUserData()
    }
  }, [status, router])

  const loadUserData = async () => {
    try {
      // TODO: Replace with actual API calls
      // Mock Soul File data
      const mockSoulFile: SoulFile = {
        personalInfo: {
          name: session?.user?.name || 'User',
          occupation: 'Software Professional',
          interests: ['Technology', 'Productivity', 'Learning'],
          location: 'United States'
        },
        communicationStyle: {
          formality: 'Professional but friendly',
          tone: 'Direct and helpful',
          preferredLength: 'Detailed when needed'
        },
        workContext: {
          industry: 'Technology',
          role: 'Developer/Manager',
          challenges: ['Time management', 'Technical decisions'],
          goals: ['Build better products', 'Improve efficiency']
        },
        personalContext: {
          family: 'Married with family',
          hobbies: ['Reading', 'Technology'],
          values: ['Privacy', 'Quality', 'Family'],
          goals: ['Personal growth', 'Work-life balance']
        },
        aiPreferences: {
          helpWith: ['Work planning', 'Technical advice', 'Decision making'],
          avoidTopics: [],
          communicationPrefs: 'Be direct and actionable'
        }
      }

      const mockUsageStats: UsageStats = {
        totalConversations: 12,
        totalMessages: 89,
        tokensUsed: 45230,
        estimatedCost: 2.15,
        avgResponseTime: 1.8,
        lastActive: new Date()
      }

      setSoulFile(mockSoulFile)
      setUsageStats(mockUsageStats)
    } catch (error) {
      console.error('Failed to load user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const savePreferences = async () => {
    setIsSaving(true)
    try {
      // TODO: Save preferences to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Show success message
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const regenerateSoulFile = async () => {
    const confirmed = confirm('This will start a new onboarding conversation to update your Soul File. Continue?')
    if (confirmed) {
      router.push('/onboarding')
    }
  }

  const exportData = () => {
    const data = { soulFile, usageStats, preferences }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `legacy-ai-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const deleteAccount = async () => {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.')
    if (confirmed) {
      const doubleConfirm = confirm('This will permanently delete all your conversations, Soul File, and account data. Type "DELETE" in the next prompt to confirm.')
      if (doubleConfirm) {
        const finalConfirm = prompt('Type "DELETE" to confirm account deletion:')
        if (finalConfirm === 'DELETE') {
          // TODO: Call delete account API
          alert('Account deletion functionality will be implemented in production.')
        }
      }
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-legacy-neutral flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-legacy-navy border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'soul-file', name: 'Soul File', icon: '🧠' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'usage', name: 'Usage & Billing', icon: '📊' },
    { id: 'privacy', name: 'Privacy & Data', icon: '🛡️' }
  ]

  return (
    <div className="min-h-screen bg-legacy-neutral">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/chat" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-legacy-navy text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-legacy-navy rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-medium">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{session?.user?.name}</h3>
                      <p className="text-gray-600">{session?.user?.email}</p>
                      <button className="text-legacy-navy text-sm mt-2 hover:underline">
                        Change profile photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={session?.user?.name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-legacy-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={session?.user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-legacy-navy focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button className="btn-legacy px-6 py-2">
                    Update Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'soul-file' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Soul File</h2>
                  <button 
                    onClick={regenerateSoulFile}
                    className="btn-legacy-outline px-4 py-2 text-sm"
                  >
                    Regenerate
                  </button>
                </div>

                <p className="text-gray-600 mb-8">
                  Your Soul File contains the personal information that helps your AI assistant understand who you are and how to help you best.
                </p>

                {soulFile && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Name:</strong> {soulFile.personalInfo.name}</div>
                        <div><strong>Occupation:</strong> {soulFile.personalInfo.occupation}</div>
                        <div><strong>Location:</strong> {soulFile.personalInfo.location}</div>
                        <div>
                          <strong>Interests:</strong> {soulFile.personalInfo.interests?.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Communication Style</h3>
                      <div className="text-sm space-y-2">
                        <div><strong>Formality:</strong> {soulFile.communicationStyle.formality}</div>
                        <div><strong>Tone:</strong> {soulFile.communicationStyle.tone}</div>
                        <div><strong>Preferred Length:</strong> {soulFile.communicationStyle.preferredLength}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Work Context</h3>
                      <div className="text-sm space-y-2">
                        <div><strong>Industry:</strong> {soulFile.workContext.industry}</div>
                        <div><strong>Role:</strong> {soulFile.workContext.role}</div>
                        <div><strong>Key Challenges:</strong> {soulFile.workContext.challenges?.join(', ')}</div>
                        <div><strong>Goals:</strong> {soulFile.workContext.goals?.join(', ')}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">AI Preferences</h3>
                      <div className="text-sm space-y-2">
                        <div><strong>Help With:</strong> {soulFile.aiPreferences.helpWith?.join(', ')}</div>
                        <div><strong>Communication Preferences:</strong> {soulFile.aiPreferences.communicationPrefs}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">Preferences</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-4">Appearance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Theme</div>
                          <div className="text-sm text-gray-600">Choose your preferred theme</div>
                        </div>
                        <select 
                          value={preferences.theme}
                          onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                          className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Features</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'voiceEnabled', label: 'Voice Interactions', desc: 'Enable voice input and output' },
                        { key: 'notifications', label: 'Notifications', desc: 'Receive notifications for important updates' },
                        { key: 'autoSave', label: 'Auto-save Conversations', desc: 'Automatically save conversation history' },
                        { key: 'streamingResponses', label: 'Streaming Responses', desc: 'See responses as they are generated' }
                      ].map((pref) => (
                        <div key={pref.key} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{pref.label}</div>
                            <div className="text-sm text-gray-600">{pref.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences[pref.key as keyof typeof preferences] as boolean}
                              onChange={(e) => setPreferences(prev => ({ 
                                ...prev, 
                                [pref.key]: e.target.checked 
                              }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-legacy-navy/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-legacy-navy"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={savePreferences}
                    disabled={isSaving}
                    className="btn-legacy px-6 py-2 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">Usage & Billing</h2>

                {usageStats && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-legacy-navy">
                          {usageStats.totalConversations}
                        </div>
                        <div className="text-sm text-gray-600">Conversations</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-legacy-navy">
                          {usageStats.totalMessages}
                        </div>
                        <div className="text-sm text-gray-600">Messages</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-legacy-navy">
                          {usageStats.tokensUsed.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Tokens Used</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ${usageStats.estimatedCost.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">This Month</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Current Plan</h3>
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Free Tier</h4>
                            <p className="text-sm text-gray-600">
                              100,000 tokens per month included
                            </p>
                          </div>
                          <button className="btn-legacy-outline px-4 py-2 text-sm">
                            Upgrade Plan
                          </button>
                        </div>
                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-legacy-navy h-2 rounded-full" 
                            style={{ width: `${(usageStats.tokensUsed / 100000) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {usageStats.tokensUsed.toLocaleString()} / 100,000 tokens used this month
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">Privacy & Data</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium">Export Your Data</div>
                          <div className="text-sm text-gray-600">
                            Download a copy of your conversations and Soul File
                          </div>
                        </div>
                        <button 
                          onClick={exportData}
                          className="btn-legacy-outline px-4 py-2 text-sm"
                        >
                          Export
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">End-to-End Encryption</div>
                            <div className="text-sm text-gray-600">
                              Your conversations and Soul File are encrypted before being stored
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">No Data Mining</div>
                            <div className="text-sm text-gray-600">
                              We never use your data for advertising or sell it to third parties
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>
                    <div className="border border-red-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-red-600">Delete Account</div>
                          <div className="text-sm text-gray-600">
                            Permanently delete your account and all associated data
                          </div>
                        </div>
                        <button 
                          onClick={deleteAccount}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}