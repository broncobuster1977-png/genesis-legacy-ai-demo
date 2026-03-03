/* LEGACY AI ANTHROPIC CLIENT CONFIGURATION */
/* Atlas Technical Director - February 28, 2026 */

import Anthropic from '@anthropic-ai/sdk'

// Initialize Anthropic client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Interface for conversation context
export interface ConversationContext {
  soulFile?: any // User's personality data
  recentMessages: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp?: Date
  }>
  userPreferences?: any
}

// Base system prompt for Legacy AI assistants
export const getBaseSystemPrompt = (soulFile?: any) => {
  const basePrompt = `You are a personal AI assistant created by Legacy AI. You are designed to be helpful, harmless, and honest while maintaining the user's privacy and serving their personal needs.

Key principles:
- You serve people, not platforms
- Privacy and user control are paramount
- You are personal and adapt to the user's communication style
- You remember context across conversations
- You are helpful but respect boundaries

Communication style: Be warm, professional, and genuinely helpful. Avoid corporate speak or overly casual language.`

  if (soulFile) {
    return `${basePrompt}

PERSONAL CONTEXT FROM SOUL FILE:
${JSON.stringify(soulFile, null, 2)}

Use this information to personalize your responses appropriately. Remember details about the user's work, interests, communication preferences, and personal context.`
  }

  return basePrompt
}

// Generate streaming completion
export async function generateStreamingResponse(
  context: ConversationContext,
  userMessage: string
) {
  const messages: Anthropic.Messages.MessageParam[] = []
  
  // Add conversation history
  for (const msg of context.recentMessages) {
    messages.push({
      role: msg.role,
      content: msg.content
    })
  }
  
  // Add current user message
  messages.push({
    role: 'user',
    content: userMessage
  })

  return anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    system: getBaseSystemPrompt(context.soulFile),
    messages,
    stream: true,
  })
}

// Generate Soul File from onboarding conversation
export async function generateSoulFile(conversationHistory: Array<{ role: string; content: string }>) {
  const soulFilePrompt = `You are a Soul File generator for Legacy AI. Your job is to analyze a conversation and extract key personal information into a structured JSON format.

Based on the conversation below, generate a Soul File JSON object with these fields:

{
  "personalInfo": {
    "name": "User's name",
    "occupation": "Their job/role",
    "interests": ["array", "of", "interests"],
    "location": "City, State/Country if mentioned"
  },
  "communicationStyle": {
    "formality": "casual/professional/mixed",
    "tone": "friendly/direct/thoughtful/etc",
    "preferredLength": "brief/detailed/conversational"
  },
  "workContext": {
    "industry": "Their industry",
    "role": "Specific role/title",
    "challenges": ["work", "challenges", "mentioned"],
    "goals": ["professional", "goals"]
  },
  "personalContext": {
    "family": "Family situation if mentioned",
    "hobbies": ["personal", "interests"],
    "values": ["important", "values", "expressed"],
    "goals": ["personal", "aspirations"]
  },
  "aiPreferences": {
    "helpWith": ["what", "they", "want", "AI", "help", "with"],
    "avoidTopics": ["topics", "to", "avoid"],
    "communicationPrefs": "How they want to interact"
  }
}

Only include information that was actually mentioned or can be reasonably inferred. Don't make up details.

CONVERSATION HISTORY:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n\n')}

Generate the Soul File JSON:`

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: soulFilePrompt
    }]
  })

  // Extract JSON from response
  const content = response.content[0]
  if (content.type === 'text') {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (error) {
      console.error('Failed to parse Soul File JSON:', error)
    }
  }
  
  throw new Error('Failed to generate Soul File')
}

// Token usage estimation (rough)
export function estimateTokens(text: string): number {
  // Rough approximation: ~4 characters per token
  return Math.ceil(text.length / 4)
}