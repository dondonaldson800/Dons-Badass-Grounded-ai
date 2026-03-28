/**
 * Q&A MODULE - Badass Grounded AI
 * Handles Question & Answer processing
 */

import EmergentConfig from '../config/EmergentConfig';

export class QAModule {
  constructor() {
    this.endpoint = `${EmergentConfig.api.baseUrl}${EmergentConfig.api.endpoints.qa}`;
    this.moduleName = 'QA Module';
  }

  /**
   * Process Q&A request
   * @param {Object} params - { question, appId, category, fileContext }
   * @returns {Promise<Object>} - Q&A response
   */
  async execute(params) {
    const { question, appId, category, fileContext } = params;

    console.log(`[${this.moduleName}] Processing question:`, question);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question,
          app_id: appId,
          category: category,
          file_context: fileContext
        })
      });

      if (!response.ok) {
        throw new Error(`Q&A API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[${this.moduleName}] ✅ Response received`);

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
   * Validate Q&A parameters
   */
  validate(params) {
    if (!params.question || params.question.trim() === '') {
      throw new Error('Question is required');
    }
    return true;
  }
}

export default QAModule;
