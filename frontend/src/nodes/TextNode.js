import { BaseNode } from './BaseNode';

/**
 * TextNode - Text processing node with dynamic handles
 * Supports variable extraction from {{variableName}} syntax
 */
export class TextNode extends BaseNode {
  constructor(id, position) {
    super(id, 'textNode', 'Text', position);
    
    // Default output handle
    this.addHandle('output', 'output', 'Output');
    
    // Default configuration
    this.setConfig({
      text: '',
      width: 200,
      height: 100
    });
  }

  /**
   * Extract variables from text using {{variableName}} syntax
   * @param {string} text - Text content
   * @returns {Array} - Array of variable names
   */
  extractVariables(text) {
    const regex = /\{\{(\w+)\}\}/g;
    const variables = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const varName = match[1];
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    }

    return variables;
  }

  /**
   * Update text and regenerate handles based on variables
   * @param {string} text - New text content
   */
  updateText(text) {
    this.setConfig({ text });
    
    // Extract variables and create input handles
    const variables = this.extractVariables(text);
    
    // Clear existing input handles
    this.data.handles.inputs = [];
    
    // Add handle for each variable
    variables.forEach(varName => {
      this.addHandle('input', varName, varName);
    });
  }

  /**
   * Update dimensions for dynamic resizing
   * @param {number} width - New width
   * @param {number} height - New height
   */
  updateDimensions(width, height) {
    this.setConfig({ width, height });
  }

  validate() {
    const errors = [];
    const config = this.data.config;

    if (!config.text || config.text.trim() === '') {
      errors.push('Text content is required');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}
