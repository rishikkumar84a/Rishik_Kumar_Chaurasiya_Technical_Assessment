import { InputNode } from './InputNode';
import { OutputNode } from './OutputNode';
import { TextNode } from './TextNode';
import { LLMNode } from './LLMNode';
import { FilterNode } from './FilterNode';
import { TransformNode } from './TransformNode';
import { CombineNode } from './CombineNode';
import { NoteNode } from './NoteNode';
import { APINode } from './APINode';

/**
 * NodeFactory - Creates node instances based on type
 */
export class NodeFactory {
  static createNode(type, id, position) {
    switch (type) {
      case 'inputNode':
        return new InputNode(id, position);
      case 'outputNode':
        return new OutputNode(id, position);
      case 'textNode':
        return new TextNode(id, position);
      case 'llmNode':
        return new LLMNode(id, position);
      case 'filterNode':
        return new FilterNode(id, position);
      case 'transformNode':
        return new TransformNode(id, position);
      case 'combineNode':
        return new CombineNode(id, position);
      case 'noteNode':
        return new NoteNode(id, position);
      case 'apiNode':
        return new APINode(id, position);
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }

  static getAvailableNodeTypes() {
    return [
      { type: 'inputNode', label: 'Input', description: 'Input data source' },
      { type: 'outputNode', label: 'Output', description: 'Output destination' },
      { type: 'textNode', label: 'Text', description: 'Text processing' },
      { type: 'llmNode', label: 'LLM', description: 'Language model' },
      { type: 'filterNode', label: 'Filter', description: 'Filter data' },
      { type: 'transformNode', label: 'Transform', description: 'Transform text' },
      { type: 'combineNode', label: 'Combine', description: 'Combine inputs' },
      { type: 'noteNode', label: 'Note', description: 'Sticky note' },
      { type: 'apiNode', label: 'API', description: 'API Request' }
    ];
  }
}
