/**
 * BADASS AI ENGINE - Central Intelligence Core
 * Project: Dons-Badass-Grounded-ai
 * Owner: Don (Master Builder)
 * 
 * This is the centralized AI execution engine that routes all
 * AI requests from the 20 niche apps through a unified interface.
 */

import EmergentConfig from './config/EmergentConfig';
import QAModule from './modules/QAModule';
import ImageModule from './modules/ImageModule';
import ChatModule from './modules/ChatModule';

export class BadassAIEngine {
  constructor() {
    this.engineName = "Badass Grounded AI Engine";
    this.version = "1.0.0";
    this.status = "Initializing...";
    
    // Initialize modules
    this.modules = {
      qa: new QAModule(),
      image: new ImageModule(),
      chat: new ChatModule()
    };
    
    // Performance tracking
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      avgResponseTime: 0
    };
    
    console.log(`🚀 [${this.engineName}] v${this.version} initialized`);
    this.status = "Ready";
  }

  /**
   * CENTRAL GROUNDED AI EXECUTION FUNCTION
   * All AI requests from the 20 niche apps flow through this method
   * 
   * @param {string} taskType - Type of AI task: 'qa', 'image', 'chat'
   * @param {Object} params - Task-specific parameters
   * @returns {Promise<Object>} - AI task result
   */
  async executeGroundedAI(taskType, params) {
    const startTime = performance.now();
    this.stats.totalRequests++;

    console.log(`\n🎯 [${this.engineName}] Executing ${taskType.toUpperCase()} task`);
    console.log(`📋 Parameters:`, params);

    try {
      // Validate task type
      if (!this.modules[taskType]) {
        throw new Error(`Unknown task type: ${taskType}`);
      }

      // Get the appropriate module
      const module = this.modules[taskType];

      // Validate parameters
      module.validate(params);

      // Execute the AI task
      const result = await module.execute(params);

      // Track performance
      const responseTime = performance.now() - startTime;
      this.updateStats(true, responseTime);

      console.log(`✅ [${this.engineName}] Task completed in ${responseTime.toFixed(2)}ms`);

      return {
        success: true,
        taskType: taskType,
        result: result.data,
        metadata: {
          module: module.moduleName,
          responseTime: `${responseTime.toFixed(2)}ms`,
          timestamp: result.timestamp,
          engine: this.engineName
        }
      };

    } catch (error) {
      // Track failure
      const responseTime = performance.now() - startTime;
      this.updateStats(false, responseTime);

      console.error(`❌ [${this.engineName}] Task failed:`, error);

      return {
        success: false,
        taskType: taskType,
        error: error.message || error,
        metadata: {
          responseTime: `${responseTime.toFixed(2)}ms`,
          timestamp: new Date().toISOString(),
          engine: this.engineName
        }
      };
    }
  }

  /**
   * Update engine statistics
   */
  updateStats(success, responseTime) {
    if (success) {
      this.stats.successfulRequests++;
    } else {
      this.stats.failedRequests++;
    }

    // Calculate running average response time
    const totalResponses = this.stats.successfulRequests + this.stats.failedRequests;
    this.stats.avgResponseTime = 
      (this.stats.avgResponseTime * (totalResponses - 1) + responseTime) / totalResponses;
  }

  /**
   * Get engine statistics
   */
  getStats() {
    return {
      engine: this.engineName,
      version: this.version,
      status: this.status,
      stats: {
        ...this.stats,
        successRate: this.stats.totalRequests > 0 
          ? ((this.stats.successfulRequests / this.stats.totalRequests) * 100).toFixed(2) + '%'
          : '0%',
        avgResponseTime: this.stats.avgResponseTime.toFixed(2) + 'ms'
      }
    };
  }

  /**
   * Process Q&A request (convenience method)
   */
  async processQA(question, appId, category = null, fileContext = null) {
    return this.executeGroundedAI('qa', {
      question,
      appId,
      category,
      fileContext
    });
  }

  /**
   * Generate image (convenience method)
   */
  async generateImage(prompt, referenceImage = null, style = 'realistic') {
    return this.executeGroundedAI('image', {
      prompt,
      referenceImage,
      style
    });
  }

  /**
   * Process chat message (convenience method)
   */
  async processChat(message, sessionId, context = null) {
    return this.executeGroundedAI('chat', {
      message,
      sessionId,
      context
    });
  }

  /**
   * Health check
   */
  async healthCheck() {
    return {
      status: this.status,
      engine: this.engineName,
      version: this.version,
      config: {
        aiProvider: EmergentConfig.ai.provider,
        adMobEnabled: EmergentConfig.features.enableAdMob,
        totalApps: EmergentConfig.empire.totalApps
      },
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const badassEngine = new BadassAIEngine();

export default badassEngine;
