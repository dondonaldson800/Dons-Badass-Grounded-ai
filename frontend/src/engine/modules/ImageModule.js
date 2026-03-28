/**
 * IMAGE GENERATION MODULE - Badass Grounded AI
 * Handles AI Image Generation
 */

import EmergentConfig from '../config/EmergentConfig';

export class ImageModule {
  constructor() {
    this.endpoint = `${EmergentConfig.api.baseUrl}${EmergentConfig.api.endpoints.image}`;
    this.moduleName = 'Image Module';
  }

  /**
   * Generate image from prompt
   * @param {Object} params - { prompt, referenceImage, style }
   * @returns {Promise<Object>} - Generated image data
   */
  async execute(params) {
    const { prompt, referenceImage, style } = params;

    console.log(`[${this.moduleName}] Generating image:`, prompt);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          reference_image: referenceImage,
          style: style || 'realistic'
        })
      });

      if (!response.ok) {
        throw new Error(`Image API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[${this.moduleName}] ✅ Image generated`);

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
   * Validate image generation parameters
   */
  validate(params) {
    if (!params.prompt || params.prompt.trim() === '') {
      throw new Error('Image prompt is required');
    }
    return true;
  }
}

export default ImageModule;
