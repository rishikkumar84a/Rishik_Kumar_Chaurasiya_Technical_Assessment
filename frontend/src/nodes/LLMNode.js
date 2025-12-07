import { BaseNode } from './BaseNode';

/**
 * LLMNode - Large Language Model integration node
 */
export class LLMNode extends BaseNode {
  constructor(id, position) {
    super(id, 'llmNode', 'LLM', position);
    
    // LLM has system and prompt inputs, and response output
    this.addHandle('input', 'system', 'System');
    this.addHandle('input', 'prompt', 'Prompt');
    this.addHandle('output', 'response', 'Response');
    
    // Default configuration
    this.setConfig({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000
    });
  }

  validate() {
    const errors = [];
    const config = this.data.config;

    if (config.temperature < 0 || config.temperature > 2) {
      errors.push('Temperature must be between 0 and 2');
    }

    if (config.maxTokens < 1) {
      errors.push('Max tokens must be positive');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}
