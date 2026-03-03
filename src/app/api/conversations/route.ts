/* LEGACY AI CONVERSATIONS API ROUTE */
/* Atlas Technical Director - February 28, 2026 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { encryptMessages, decryptMessages } from '@/lib/encryption'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const conversationId = searchParams.get('conversationId')

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (conversationId) {
      // Get specific conversation with messages
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId: user.id
        }
      })

      if (!conversation) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        )
      }

      try {
        // Decrypt messages
        const messages = conversation.messages 
          ? decryptMessages(conversation.messages, user.id, user.email)
          : []

        return NextResponse.json({
          id: conversation.id,
          title: conversation.title,
          type: conversation.type,
          messages,
          tokenUsage: conversation.tokenUsage,
          voiceRoomId: conversation.voiceRoomId,
          voiceActive: conversation.voiceActive,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt
        })

      } catch (error) {
        console.error('Message decryption error:', error)
        return NextResponse.json(
          { error: 'Failed to decrypt conversation messages' },
          { status: 500 }
        )
      }
    } else {
      // Get conversation list (without messages for performance)
      const conversations = await prisma.conversation.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          title: true,
          type: true,
          tokenUsage: true,
          voiceRoomId: true,
          voiceActive: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { updatedAt: 'desc' },
        take: limit,
        skip: offset
      })

      // Get total count for pagination
      const totalCount = await prisma.conversation.count({
        where: { userId: user.id }
      })

      return NextResponse.json({
        conversations,
        totalCount,
        hasMore: offset + limit < totalCount
      })
    }

  } catch (error) {
    console.error('Conversations GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, type = 'CHAT', initialMessages = [] } = body

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    try {
      // Encrypt initial messages
      const encryptedMessages = encryptMessages(initialMessages, user.id, user.email)

      // Create new conversation
      const conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          title: title || 'New Conversation',
          type,
          messages: encryptedMessages
        }
      })

      return NextResponse.json(
        {
          id: conversation.id,
          title: conversation.title,
          type: conversation.type,
          messages: initialMessages,
          tokenUsage: conversation.tokenUsage,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt
        },
        { status: 201 }
      )

    } catch (error) {
      console.error('Conversation creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Conversations POST API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { conversationId, title, messages, voiceRoomId, voiceActive } = body

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      )
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify conversation ownership
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: user.id
      }
    })

    if (!existingConversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    try {
      // Prepare update data
      const updateData: any = {}
      
      if (title !== undefined) {
        updateData.title = title
      }
      
      if (messages !== undefined) {
        updateData.messages = encryptMessages(messages, user.id, user.email)
      }
      
      if (voiceRoomId !== undefined) {
        updateData.voiceRoomId = voiceRoomId
      }
      
      if (voiceActive !== undefined) {
        updateData.voiceActive = voiceActive
      }

      updateData.updatedAt = new Date()

      // Update conversation
      const conversation = await prisma.conversation.update({
        where: { id: conversationId },
        data: updateData
      })

      return NextResponse.json({
        id: conversation.id,
        title: conversation.title,
        type: conversation.type,
        tokenUsage: conversation.tokenUsage,
        voiceRoomId: conversation.voiceRoomId,
        voiceActive: conversation.voiceActive,
        updatedAt: conversation.updatedAt
      })

    } catch (error) {
      console.error('Conversation update error:', error)
      return NextResponse.json(
        { error: 'Failed to update conversation' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Conversations PUT API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      )
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify conversation ownership and delete
    const result = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userId: user.id
      }
    })

    if (result.count === 0) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Conversation deleted successfully'
    })

  } catch (error) {
    console.error('Conversations DELETE API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}