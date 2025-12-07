import { BaseNode } from './BaseNode';

/**
 * InputNode - Entry point for pipeline data
 */
export class InputNode extends BaseNode {
  constructor(id, position) {
    super(id, 'inputNode', 'Input', position);
    
    // Input nodes only have output handles
    this.addHandle('output', 'output', 'Output');
    
    // Default configuration
    this.setConfig({
      inputName: 'input',
      inputType: 'Text'
    });
  }

  validate() {
    const errors = [];
    const config = this.data.config;

    if (!config.inputName || config.inputName.trim() === '') {
      errors.push('Input name is required');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}
