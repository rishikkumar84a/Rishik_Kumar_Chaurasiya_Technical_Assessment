import { BaseNode } from './BaseNode';

/**
 * OutputNode - Output destination for pipeline
 */
export class OutputNode extends BaseNode {
  constructor(id, position) {
    super(id, 'outputNode', 'Output', position);
    
    // Output nodes only have input handles
    this.addHandle('input', 'input', 'Input');
    
    // Default configuration
    this.setConfig({
      outputName: 'output',
      outputType: 'Text'
    });
  }

  validate() {
    const errors = [];
    const config = this.data.config;

    if (!config.outputName || config.outputName.trim() === '') {
      errors.push('Output name is required');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}
