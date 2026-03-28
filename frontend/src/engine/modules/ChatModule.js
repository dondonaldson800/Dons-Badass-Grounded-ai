/**
 * CHAT MODULE - Badass Grounded AI
 * Handles AI Chat Conversations
 */

import EmergentConfig from '../config/EmergentConfig';

export class ChatModule {
  constructor() {
    this.endpoint = `${EmergentConfig.api.baseUrl}${EmergentConfig.api.endpoints.chat}`;
    this.moduleName = 'Chat Module';
  }

  /**
   * Process chat message
   * @param {Object} params - { message, sessionId, context }
   * @returns {Promise<Object>} - Chat response
   */
  async execute(params) {
    const { message, sessionId, context } = params;

    console.log(`[${this.moduleName}] Processing message for session:`, sessionId);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: message,
          context: context
        })
      });

      if (!response.ok) {
        throw new Error(`Chat API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[${this.moduleName}] ✅ Chat response received`);

      return {
        success: true,
        data: data,
        module: this.moduleName,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`[${this.moduleName}] ❌ Error:`, error);
      throw {
        success: false,
        error: error.message,
        module: this.moduleName
      };
    }
  }

  /**
   * Validate chat parameters
   */
  validate(params) {
    if (!params.message || params.message.trim() === '') {
      throw new Error('Chat message is required');
    }
    if (!params.sessionId) {
      throw new Error('Session ID is required');
    }
    return true;
  }
}

export default ChatModule;
