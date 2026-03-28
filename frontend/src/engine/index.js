/**
 * BADASS AI ENGINE - Main Export
 * Central Intelligence System for D's Empire
 */

import badassEngine, { BadassAIEngine } from './BadassAIEngine';
import EmergentConfig from './config/EmergentConfig';
import QAModule from './modules/QAModule';
import ImageModule from './modules/ImageModule';
import ChatModule from './modules/ChatModule';

// Export singleton instance as default
export default badassEngine;

// Export classes for custom implementations
export {
  BadassAIEngine,
  EmergentConfig,
  QAModule,
  ImageModule,
  ChatModule
};

// Convenience exports
export const executeGroundedAI = (taskType, params) => 
  badassEngine.executeGroundedAI(taskType, params);

export const getEngineStats = () => 
  badassEngine.getStats();

export const healthCheck = () => 
  badassEngine.healthCheck();
