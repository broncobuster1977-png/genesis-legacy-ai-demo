'use client'

import { useState, useEffect, useRef } from 'react'
import { Room, RoomEvent, RemoteParticipant, Track } from 'livekit-client'

interface SelectedAgent {
  id: string
  name: string
  role: string
  color: string
  avatar: string
}

interface LiveKitDemoRoomProps {
  roomName: string
  selectedAgents: SelectedAgent[]
}

interface ParticipantView {
  id: string
  name: string
  role?: string
  color?: string
  isAgent: boolean
  audioEnabled: boolean
  videoEnabled: boolean
  isSpeaking: boolean
  videoElement?: HTMLVideoElement
}

export function LiveKitDemoRoom({ roomName, selectedAgents }: LiveKitDemoRoomProps) {
  const [room, setRoom] = useState<Room | null>(null)
  const [participants, setParticipants] = useState<ParticipantView[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null)
  const [screenSharing, setScreenSharing] = useState(false)
  const [roomStats, setRoomStats] = useState({
    participants: 0,
    agents: 0,
    duration: '00:00'
  })

  const roomRef = useRef<Room | null>(null)
  const startTimeRef = useRef<Date | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize LiveKit connection
  useEffect(() => {
    connectToRoom()
    
    return () => {
      cleanup()
    }
  }, [roomName])

  // Update room stats
  useEffect(() => {
    if (isConnected && !intervalRef.current) {
      intervalRef.current = setInterval(updateRoomStats, 1000)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isConnected])

  const connectToRoom = async () => {
    try {
      setIsConnecting(true)
      setError(null)

      // Get LiveKit token
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roomName,
          participantName: 'Demo-Host',
          metadata: { role: 'host', type: 'human' }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get LiveKit token')
      }

      const { token, wsURL } = await response.json()

      // Create and connect room
      const newRoom = new Room()
      roomRef.current = newRoom
      setRoom(newRoom)

      // Setup event listeners
      setupRoomEvents(newRoom)

      // Connect to room
      await newRoom.connect(wsURL, token)
      setIsConnected(true)
      startTimeRef.current = new Date()

      // Simulate agent connections
      setTimeout(() => simulateAgentConnections(), 2000)

    } catch (err) {
      console.error('LiveKit connection error:', err)
      setError(err instanceof Error ? err.message : 'Connection failed')
    } finally {
      setIsConnecting(false)
    }
  }

  const setupRoomEvents = (room: Room) => {
    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      console.log('Participant connected:', participant.identity)
      updateParticipants()
    })

    room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      console.log('Participant disconnected:', participant.identity)
      updateParticipants()
    })

    room.on(RoomEvent.TrackSubscribed, (track: Track, publication: any, participant: RemoteParticipant) => {
      if (track.kind === Track.Kind.Video) {
        const videoElement = track.attach() as HTMLVideoElement
        updateParticipantVideo(participant.identity, videoElement)
      }
    })

    room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
      const speakerId = speakers.length > 0 ? speakers[0].identity : null
      setCurrentSpeaker(speakerId)
    })
  }

  const updateParticipants = () => {
    if (!roomRef.current) return

    const roomParticipants = Array.from(roomRef.current.remoteParticipants.values())
    const localParticipant = roomRef.current.localParticipant

    const allParticipants: ParticipantView[] = [
      // Local participant (demo host)
      {
        id: localParticipant.identity,
        name: 'Demo Host',
        role: 'Presenter',
        color: '#1B3A5C',
        isAgent: false,
        audioEnabled: localParticipant.isMicrophoneEnabled,
        videoEnabled: localParticipant.isCameraEnabled,
        isSpeaking: false
      },
      // Remote participants (agents)
      ...roomParticipants.map(participant => {
        const agent = selectedAgents.find(a => a.id === participant.identity)
        return {
          id: participant.identity,
          name: agent?.name || participant.identity,
          role: agent?.role,
          color: agent?.color || '#6B7280',
          isAgent: true,
          audioEnabled: participant.isMicrophoneEnabled,
          videoEnabled: participant.isCameraEnabled,
          isSpeaking: currentSpeaker === participant.identity
        }
      })
    ]

    setParticipants(allParticipants)
    
    // Update stats
    setRoomStats(prev => ({
      ...prev,
      participants: allParticipants.length,
      agents: allParticipants.filter(p => p.isAgent).length
    }))
  }

  const updateParticipantVideo = (participantId: string, videoElement: HTMLVideoElement) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? { ...p, videoElement }
        : p
    ))
  }

  const simulateAgentConnections = () => {
    // Simulate agents joining the room
    selectedAgents.forEach((agent, index) => {
      setTimeout(() => {
        console.log(`Agent ${agent.name} joining room...`)
        // In a real implementation, this would trigger agent connection
      }, index * 1000)
    })
  }

  const updateRoomStats = () => {
    if (!startTimeRef.current) return

    const elapsed = Date.now() - startTimeRef.current.getTime()
    const minutes = Math.floor(elapsed / 60000)
    const seconds = Math.floor((elapsed % 60000) / 1000)
    const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    setRoomStats(prev => ({ ...prev, duration }))
  }

  const toggleScreenShare = async () => {
    if (!room) return

    try {
      if (!screenSharing) {
        await room.localParticipant.setScreenShareEnabled(true)
        setScreenSharing(true)
      } else {
        await room.localParticipant.setScreenShareEnabled(false)
        setScreenSharing(false)
      }
    } catch (err) {
      console.error('Screen share error:', err)
    }
  }

  const cleanup = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    if (roomRef.current) {
      roomRef.current.disconnect()
      roomRef.current = null
    }
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 text-center">
        <div className="text-red-400 text-xl font-semibold mb-2">Connection Error</div>
        <p className="text-white/80 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-white text-xl font-semibold mb-2">Connecting to Demo Room</h3>
          <p className="text-blue-100">Setting up LiveKit connection and initializing agents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Room Stats Bar */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white font-medium">Live</span>
            </div>
            <div className="text-white/80">
              Duration: <span className="font-mono">{roomStats.duration}</span>
            </div>
            <div className="text-white/80">
              Participants: {roomStats.participants}
            </div>
            <div className="text-white/80">
              Agents: {roomStats.agents}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleScreenShare}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                screenSharing 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {screenSharing ? 'Stop Sharing' : 'Share Screen'}
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={`
              relative aspect-video bg-gray-900 rounded-xl overflow-hidden border-2 transition-all duration-300
              ${participant.isSpeaking ? 'border-green-400 shadow-lg shadow-green-400/25' : 'border-white/20'}
            `}
          >
            {/* Video Feed */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {participant.videoElement ? (
                <video
                  ref={(el) => {
                    if (el && participant.videoElement) {
                      el.srcObject = participant.videoElement.srcObject
                    }
                  }}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: participant.color }}
                >
                  {participant.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Participant Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{participant.name}</p>
                  {participant.role && (
                    <p className="text-white/60 text-xs">{participant.role}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Audio Status */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    participant.audioEnabled ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      {participant.audioEnabled ? (
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.777L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.777a1 1 0 011.617.453zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0118 10a9.972 9.972 0 01-1.929 5.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0016 10c0-1.636-.491-3.157-1.343-4.414a1 1 0 010-1.414zM12.829 5.172a1 1 0 011.414 0A5.983 5.983 0 0116 10a5.983 5.983 0 01-1.757 4.828 1 1 0 01-1.414-1.414A3.983 3.983 0 0014 10a3.983 3.983 0 00-1.171-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.777L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.777a1 1 0 011.617.453zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  </div>
                  
                  {/* Agent Badge */}
                  {participant.isAgent && (
                    <div className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                      AI
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Speaking Indicator */}
            {participant.isSpeaking && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}

        {/* Empty slots for additional participants */}
        {Array.from({ length: Math.max(0, 8 - participants.length) }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-video bg-white/5 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white/40 text-sm">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}