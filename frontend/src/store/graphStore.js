import { create } from 'zustand';
import { NodeFactory } from '../nodes';
import { isDAG } from '../lib/dagValidator';

/**
 * Graph Store - Manages pipeline state using Zustand
 */
export const useStore = create((set, get) => ({
  // State
  nodes: [],
  edges: [],
  selectedNode: null,
  isValid: true,
  validationErrors: [],

  // Actions

  /**
   * Add a new node to the pipeline
   */
  addNode: (type, position) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const node = NodeFactory.createNode(type, id, position);
    
    set(state => ({
      nodes: [...state.nodes, node.toJSON()]
    }));

    return id;
  },

  /**
   * Update node data
   */
  updateNode: (nodeId, data) => {
    set(state => ({
      nodes: state.nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    }));
  },

  /**
   * Update node position
   */
  updateNodePosition: (nodeId, position) => {
    set(state => ({
      nodes: state.nodes.map(node =>
        node.id === nodeId
          ? { ...node, position }
          : node
      )
    }));
  },

  /**
   * Delete a node
   */
  deleteNode: (nodeId) => {
    set(state => ({
      nodes: state.nodes.filter(node => node.id !== nodeId),
      edges: state.edges.filter(edge => 
        edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode: state.selectedNode === nodeId ? null : state.selectedNode
    }));

    // Revalidate after deletion
    get().validateGraph();
  },

  /**
   * Add an edge between nodes
   */
  addEdge: (edge) => {
    const { edges, nodes } = get();

    // Check if edge already exists
    const edgeExists = edges.some(e => 
      e.source === edge.source && 
      e.target === edge.target &&
      e.sourceHandle === edge.sourceHandle &&
      e.targetHandle === edge.targetHandle
    );

    if (edgeExists) {
      return;
    }

    // Check if target handle already has an incoming edge
    const targetHasIncoming = edges.some(e =>
      e.target === edge.target && e.targetHandle === edge.targetHandle
    );

    if (targetHasIncoming) {
      console.warn('Target handle already has an incoming edge');
      return;
    }

    // Add the edge
    const newEdges = [...edges, edge];

    // Validate DAG before committing
    if (!isDAG(newEdges, nodes)) {
      console.error('Adding this edge would create a cycle');
      set({ validationErrors: ['Adding this edge would create a cycle'] });
      return;
    }

    set({ edges: newEdges });
    get().validateGraph();
  },

  /**
   * Delete an edge
   */
  deleteEdge: (edgeId) => {
    set(state => ({
      edges: state.edges.filter(edge => edge.id !== edgeId)
    }));

    get().validateGraph();
  },

  /**
   * Set selected node
   */
  setSelectedNode: (nodeId) => {
    set({ selectedNode: nodeId });
  },

  /**
   * Validate the entire graph
   */
  validateGraph: () => {
    const { nodes, edges } = get();
    const errors = [];

    // Check if DAG
    const isDagValid = isDAG(edges, nodes);
    if (!isDagValid) {
      errors.push('Pipeline contains cycles (not a valid DAG)');
    }

    // Validate individual nodes
    nodes.forEach(node => {
      // Create node instance for validation
      try {
        const nodeInstance = NodeFactory.createNode(node.type, node.id, node.position);
        Object.assign(nodeInstance.data, node.data);
        const validation = nodeInstance.validate();
        
        if (!validation.valid) {
          validation.errors.forEach(err => {
            errors.push(`Node ${node.data.label} (${node.id}): ${err}`);
          });
        }
      } catch (e) {
        console.error('Error validating node:', e);
      }
    });

    set({
      isValid: errors.length === 0,
      validationErrors: errors
    });

    return errors.length === 0;
  },

  /**
   * Clear all nodes and edges
   */
  clearGraph: () => {
    set({
      nodes: [],
      edges: [],
      selectedNode: null,
      isValid: true,
      validationErrors: []
    });
  },

  /**
   * Get pipeline JSON for backend submission
   */
  getPipelineJSON: () => {
    const { nodes, edges } = get();
    return {
      nodes: nodes,
      edges: edges
    };
  },

  /**
   * Load pipeline from JSON
   */
  loadPipeline: (data) => {
    set({
      nodes: data.nodes || [],
      edges: data.edges || [],
      selectedNode: null
    });

    get().validateGraph();
  }
}));
