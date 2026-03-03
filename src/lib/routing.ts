/**
 * Local Model Routing Integration for Legacy AI Web App
 * Connects chat interface to cost-optimized routing framework
 */

interface Message {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
}

export interface RoutingConfig {
  routingUrl: string;
  agentName: string;
  enableRouting: boolean;
  fallbackToCloud: boolean;
  qualityThreshold: number;
}

export interface RoutingResponse {
  success: boolean;
  content: string;
  method: 'local_ollama' | 'local_verified' | 'cloud_anthropic' | 'fallback';
  cost: number;
  routing_metadata: {
    tier: 'local' | 'local_verify' | 'cloud';
    reason: string;
    routing_time_ms: number;
    task_hash: string;
  };
  processing_time_ms: number;
  agent: string;
}

export interface TaskClassification {
  taskType: string;
  complexity: 'simple' | 'medium' | 'complex';
  hasSensitiveContent: boolean;
  hasEscalationTriggers: boolean;
}

export class RouterClient {
  private config: RoutingConfig;

  constructor(config: Partial<RoutingConfig> = {}) {
    this.config = {
      routingUrl: process.env.ROUTING_API_URL || 'http://localhost:5000',
      agentName: 'legacy_ai_assistant',
      enableRouting: process.env.ENABLE_ROUTING === 'true',
      fallbackToCloud: true,
      qualityThreshold: 0.8,
      ...config,
    };
  }

  /**
   * Route a chat message through the local model routing system
   */
  async routeMessage(
    message: string,
    context: {
      conversationHistory?: Message[];
      soulFile?: any;
      userId?: string;
    }
  ): Promise<RoutingResponse> {
    // If routing is disabled, use direct cloud processing
    if (!this.config.enableRouting) {
      return this.processDirectCloud(message, context);
    }

    try {
      // Classify the task based on message content
      const taskClassification = this.classifyTask(message, context);

      // Call routing API
      const response = await fetch(`${this.config.routingUrl}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: this.config.agentName,
          task_type: taskClassification.taskType,
          input_data: {
            content: message,
            context: {
              conversation_length: context.conversationHistory?.length || 0,
              has_soul_file: !!context.soulFile,
              user_id: context.userId
            }
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Routing API error: ${response.status}`);
      }

      const result: RoutingResponse = await response.json();

      // Quality check for local responses
      if (this.shouldFallbackToCloud(result)) {
        return this.processDirectCloud(message, context, 'quality_fallback');
      }

      return result;

    } catch (error) {
      console.error('Routing error:', error);
      
      // Fallback to direct cloud processing
      if (this.config.fallbackToCloud) {
        return this.processDirectCloud(message, context, 'routing_error');
      }
      
      throw error;
    }
  }

  /**
   * Classify the incoming message to determine appropriate task type
   */
  private classifyTask(
    message: string, 
    context: { conversationHistory?: Message[]; soulFile?: any }
  ): TaskClassification {
    const lowerMessage = message.toLowerCase();

    // Check for sensitive content
    const sensitiveKeywords = [
      'personal', 'private', 'confidential', 'password', 'api key',
      'financial', 'bank', 'credit card', 'ssn', 'social security'
    ];
    const hasSensitiveContent = sensitiveKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    );

    // Check for escalation triggers
    const escalationTriggers = [
      'urgent', 'emergency', 'crisis', 'help immediately', 
      'tyler', 'critical', 'important decision'
    ];
    const hasEscalationTriggers = escalationTriggers.some(trigger =>
      lowerMessage.includes(trigger)
    );

    // Determine task type based on content
    let taskType = 'general_chat';
    let complexity: 'simple' | 'medium' | 'complex' = 'medium';

    if (lowerMessage.includes('what is') || lowerMessage.includes('define')) {
      taskType = 'information_lookup';
      complexity = 'simple';
    } else if (lowerMessage.includes('how to') || lowerMessage.includes('explain')) {
      taskType = 'explanation';
      complexity = 'medium';
    } else if (lowerMessage.includes('plan') || lowerMessage.includes('strategy')) {
      taskType = 'planning';
      complexity = 'complex';
    } else if (lowerMessage.includes('code') || lowerMessage.includes('program')) {
      taskType = 'technical_assistance';
      complexity = 'complex';
    } else if (lowerMessage.includes('analyze') || lowerMessage.includes('review')) {
      taskType = 'analysis';
      complexity = 'complex';
    } else if (message.length < 50) {
      taskType = 'simple_query';
      complexity = 'simple';
    }

    // Override complexity for sensitive or escalated content
    if (hasSensitiveContent || hasEscalationTriggers) {
      complexity = 'complex';
    }

    return {
      taskType,
      complexity,
      hasSensitiveContent,
      hasEscalationTriggers,
    };
  }

  /**
   * Check if we should fallback to cloud due to quality concerns
   */
  private shouldFallbackToCloud(response: RoutingResponse): boolean {
    // If it was already processed by cloud, don't fallback
    if (response.method === 'cloud_anthropic') {
      return false;
    }

    // Quality checks for local responses
    const content = response.content;
    
    // Check for common failure patterns
    const failurePatterns = [
      'I cannot help',
      'I don\'t understand',
      'Error:',
      'Unable to process',
      'Sorry, I can\'t'
    ];

    const hasFailurePattern = failurePatterns.some(pattern =>
      content.toLowerCase().includes(pattern.toLowerCase())
    );

    // Check response length (too short might indicate poor quality)
    const isTooShort = content.length < 50 && response.routing_metadata.tier === 'local';

    return hasFailurePattern || isTooShort;
  }

  /**
   * Direct cloud processing (Anthropic API) for fallback cases
   */
  private async processDirectCloud(
    message: string,
    context: any,
    reason: string = 'direct'
  ): Promise<RoutingResponse> {
    // This would integrate with the existing Anthropic client in the web app
    // For now, return a structured response that matches the expected format
    
    return {
      success: true,
      content: `[CLOUD FALLBACK - ${reason.toUpperCase()}] This would be processed directly through Anthropic API with full context and Soul File integration.`,
      method: 'cloud_anthropic',
      cost: 0.05, // Estimated cloud cost
      routing_metadata: {
        tier: 'cloud',
        reason: reason,
        routing_time_ms: 0,
        task_hash: Math.random().toString(36).substring(7)
      },
      processing_time_ms: 1500,
      agent: 'cloud_fallback'
    };
  }

  /**
   * Get routing performance metrics
   */
  async getMetrics(): Promise<any> {
    if (!this.config.enableRouting) {
      return { error: 'Routing disabled' };
    }

    try {
      const response = await fetch(`${this.config.routingUrl}/metrics`);
      if (!response.ok) {
        throw new Error(`Metrics API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch routing metrics:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Health check for routing service
   */
  async healthCheck(): Promise<boolean> {
    if (!this.config.enableRouting) {
      return false;
    }

    try {
      const response = await fetch(`${this.config.routingUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Routing health check failed:', error);
      return false;
    }
  }
}

// Export default client instance
export const routerClient = new RouterClient();

// Configuration for different environments
export const routingConfigs = {
  development: {
    routingUrl: 'http://localhost:5000',
    enableRouting: true,
    fallbackToCloud: true,
  },
  production: {
    routingUrl: process.env.ROUTING_API_URL || 'http://localhost:5000',
    enableRouting: process.env.ENABLE_ROUTING === 'true',
    fallbackToCloud: true,
  },
  testing: {
    routingUrl: 'http://localhost:5000',
    enableRouting: false, // Disable routing in tests
    fallbackToCloud: true,
  },
};

export default RouterClient;