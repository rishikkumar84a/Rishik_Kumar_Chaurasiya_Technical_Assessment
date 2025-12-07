/**
 * BaseNode - Abstract base class for all node types
 * Provides common structure and functionality for pipeline nodes
 */
export class BaseNode {
  constructor(id, type, label, position = { x: 0, y: 0 }) {
    this.id = id;
    this.type = type;
    this.position = position;
    this.data = {
      label: label,
      config: {},
      handles: {
        inputs: [],
        outputs: []
      }
    };
  }

  /**
   * Add an input or output handle to the node
   * @param {string} type - 'input' or 'output'
   * @param {string} id - Unique handle identifier
   * @param {string} label - Display label for the handle
   */
  addHandle(type, id, label = '') {
    const handle = {
      id: id,
      label: label || id,
      type: type
    };

    if (type === 'input') {
      this.data.handles.inputs.push(handle);
    } else if (type === 'output') {
      this.data.handles.outputs.push(handle);
    }
  }

  /**
   * Set configuration for the node
   * @param {object} config - Configuration object
   */
  setConfig(config) {
    this.data.config = { ...this.data.config, ...config };
  }

  /**
   * Get configuration value
   * @param {string} key - Configuration key
   */
  getConfig(key) {
    return this.data.config[key];
  }

  /**
   * Update node position
   * @param {object} position - New position {x, y}
   */
  updatePosition(position) {
    this.position = position;
  }

  /**
   * Serialize node to JSON for backend
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      position: this.position,
      data: this.data
    };
  }

  /**
   * Validate node configuration
   * Override in subclasses for specific validation
   */
  validate() {
    return {
      valid: true,
      errors: []
    };
  }
}
