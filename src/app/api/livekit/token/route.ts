/* LIVEKIT TOKEN GENERATION API */
/* Atlas Technical Director - March 1, 2026 */

import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || ''
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    const { roomName, participantName, isAgent } = await request.json()

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'Room name and participant name are required' },
        { status: 400 }
      )
    }

    if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
      console.error('LiveKit API credentials not configured')
      return NextResponse.json(
        { error: 'LiveKit not configured' },
        { status: 500 }
      )
    }

    // Create access token
    const accessToken = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: participantName,
      name: participantName,
    })

    // Grant permissions based on participant type
    if (isAgent) {
      // Agents can publish audio, video, and data
      accessToken.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
        canUpdateOwnMetadata: true,
      })
    } else {
      // Regular users have standard permissions
      accessToken.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
      })
    }

    const token = await accessToken.toJwt()

    return NextResponse.json({
      token,
      roomName,
      participantName,
      serverUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880'
    })

  } catch (error) {
    console.error('Error generating LiveKit token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}