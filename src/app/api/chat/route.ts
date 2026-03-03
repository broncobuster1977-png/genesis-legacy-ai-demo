/* LEGACY AI CHAT API ROUTE - WITH LOCAL MODEL ROUTING INTEGRATION */
/* Atlas Technical Director - February 28, 2026 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateStreamingResponse, estimateTokens } from '@/lib/anthropic'
import { decryptSoulFile, encryptMessages, decryptMessages } from '@/lib/encryption'
import { routerClient } from '@/lib/routing'

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
    const { message, conversationId } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
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

    // Get or create conversation
    let conversation
    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
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
    } else {
      // Create new conversation
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          type: 'CHAT',
          messages: encryptMessages([], user.id, user.email),
          title: message.slice(0, 50) + (message.length > 50 ? '...' : '')
        }
      })
    }

    // Decrypt existing messages
    let messages: Array<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: Date }> = []
    if (conversation.messages) {
      try {
        messages = decryptMessages(conversation.messages, user.id, user.email)
      } catch (error) {
        console.error('Failed to decrypt messages:', error)
        // Continue with empty messages if decryption fails
      }
    }

    // Get Soul File if it exists
    let soulFile = null
    if (user.soulFile) {
      try {
        soulFile = decryptSoulFile(user.soulFile, user.id, user.email)
      } catch (error) {
        console.error('Failed to decrypt Soul File:', error)
      }
    }

    // Add user message to history
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message.trim(),
      timestamp: new Date()
    }
    messages.push(newUserMessage)

    // Prepare context (keep last 10 messages for context window)
    const recentMessages = messages.slice(-10)

    try {
      // Check if routing service is available
      const routingHealthy = await routerClient.healthCheck()
      
      if (routingHealthy) {
        // Route through local model routing framework for cost optimization
        try {
          const routingResponse = await routerClient.routeMessage(message.trim(), {
            conversationHistory: messages,
            soulFile,
            userId: user.id
          })
          
          if (routingResponse.success) {
            // Create streaming response from routing result
            const readableStream = new ReadableStream({
              async start(controller) {
                try {
                  // Send the routed response as streaming chunks
                  const content = routingResponse.content
                  const chunks = content.match(/.{1,50}/g) || [content] // Split into 50-char chunks for streaming effect
                  
                  for (const chunk of chunks) {
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify({ 
                        content: chunk,
                        routing_metadata: {
                          method: routingResponse.method,
                          cost: routingResponse.cost,
                          tier: routingResponse.routing_metadata.tier,
                          agent: routingResponse.agent
                        }
                      })}\n\n`)
                    )
                    // Small delay for streaming effect
                    await new Promise(resolve => setTimeout(resolve, 50))
                  }

                  // Add AI response to message history
                  const aiMessage = {
                    id: Date.now().toString(),
                    role: 'assistant' as const,
                    content: routingResponse.content,
                    timestamp: new Date()
                  }
                  messages.push(aiMessage)

                  // Update conversation in database (use actual cost from routing)
                  const tokenUsage = routingResponse.cost > 0 ? estimateTokens(message + routingResponse.content) : 0
                  await prisma.conversation.update({
                    where: { id: conversation.id },
                    data: {
                      messages: encryptMessages(messages, user.id, user.email),
                      tokenUsage: conversation.tokenUsage + tokenUsage,
                      updatedAt: new Date()
                    }
                  })

                  // Send completion signal with routing info
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify({ 
                      done: true, 
                      conversationId: conversation.id,
                      routing_info: {
                        method: routingResponse.method,
                        cost: routingResponse.cost,
                        processing_time: routingResponse.processing_time_ms
                      }
                    })}\n\n`)
                  )
                  
                } catch (error) {
                  console.error('Routing streaming error:', error)
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify({ 
                      error: 'Failed to process routed response' 
                    })}\n\n`)
                  )
                } finally {
                  controller.close()
                }
              }
            })

            return new NextResponse(readableStream, {
              headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
              }
            })
          }
        } catch (routingError) {
          console.warn('Routing failed, falling back to direct cloud:', routingError)
          // Fall through to direct Anthropic processing
        }
      } else {
        console.warn('Routing service unhealthy, using direct cloud processing')
      }

      // FALLBACK: Direct Anthropic processing (original logic)
      const stream = await generateStreamingResponse(
        { soulFile, recentMessages },
        message.trim()
      )

      // Create a readable stream for the client
      const readableStream = new ReadableStream({
        async start(controller) {
          let fullResponse = ''
          
          try {
            for await (const chunk of stream) {
              if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
                const text = chunk.delta.text
                fullResponse += text
                
                // Send chunk to client (mark as cloud processing)
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify({ 
                    content: text,
                    routing_metadata: {
                      method: 'cloud_anthropic_direct',
                      tier: 'cloud',
                      fallback: true
                    }
                  })}\n\n`)
                )
              }
            }

            // Add AI response to message history
            const aiMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant' as const,
              content: fullResponse,
              timestamp: new Date()
            }
            messages.push(aiMessage)

            // Update conversation in database
            const tokenUsage = estimateTokens(message + fullResponse)
            await prisma.conversation.update({
              where: { id: conversation.id },
              data: {
                messages: encryptMessages(messages, user.id, user.email),
                tokenUsage: conversation.tokenUsage + tokenUsage,
                updatedAt: new Date()
              }
            })

            // Send completion signal
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ 
                done: true, 
                conversationId: conversation.id,
                routing_info: {
                  method: 'cloud_anthropic_direct',
                  fallback: true,
                  cost: tokenUsage * 0.00001 // Approximate cloud cost
                }
              })}\n\n`)
            )
            
          } catch (error) {
            console.error('Streaming error:', error)
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ 
                error: 'Failed to generate response' 
              })}\n\n`)
            )
          } finally {
            controller.close()
          }
        }
      })

      // Return streaming response
      return new NextResponse(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      })

    } catch (error) {
      console.error('AI generation error:', error)
      return NextResponse.json(
        { error: 'Failed to generate AI response' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}