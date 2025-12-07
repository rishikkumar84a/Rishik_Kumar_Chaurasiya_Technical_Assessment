/**
 * Topological Sort - Determines execution order for DAG
 * Uses Kahn's Algorithm
 */

/**
 * Perform topological sort on graph
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Ordered array of node IDs (execution order)
 */
export function topologicalSort(edges, nodes) {
  if (nodes.length === 0) return [];

  // Build adjacency list and in-degree map
  const graph = {};
  const inDegree = {};

  // Initialize
  nodes.forEach(node => {
    graph[node.id] = [];
    inDegree[node.id] = 0;
  });

  // Build graph and calculate in-degrees
  edges.forEach(edge => {
    graph[edge.source].push(edge.target);
    inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
  });

  // Find all nodes with no incoming edges
  const queue = [];
  Object.keys(inDegree).forEach(nodeId => {
    if (inDegree[nodeId] === 0) {
      queue.push(nodeId);
    }
  });

  const sorted = [];

  // Process nodes in topological order
  while (queue.length > 0) {
    const nodeId = queue.shift();
    sorted.push(nodeId);

    // Reduce in-degree for neighbors
    const neighbors = graph[nodeId] || [];
    neighbors.forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  // If sorted length != nodes length, there's a cycle
  if (sorted.length !== nodes.length) {
    throw new Error('Graph contains a cycle - cannot perform topological sort');
  }

  return sorted;
}

/**
 * Get execution layers (nodes that can be executed in parallel)
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Array of layers, each layer is array of node IDs
 */
export function getExecutionLayers(edges, nodes) {
  if (nodes.length === 0) return [];

  const graph = {};
  const inDegree = {};

  nodes.forEach(node => {
    graph[node.id] = [];
    inDegree[node.id] = 0;
  });

  edges.forEach(edge => {
    graph[edge.source].push(edge.target);
    inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
  });

  const layers = [];
  const processed = new Set();

  while (processed.size < nodes.length) {
    const layer = [];
    
    // Find all nodes with no remaining dependencies
    Object.keys(inDegree).forEach(nodeId => {
      if (!processed.has(nodeId) && inDegree[nodeId] === 0) {
        layer.push(nodeId);
      }
    });

    if (layer.length === 0) {
      throw new Error('Graph contains a cycle');
    }

    layers.push(layer);

    // Mark as processed and update in-degrees
    layer.forEach(nodeId => {
      processed.add(nodeId);
      const neighbors = graph[nodeId] || [];
      neighbors.forEach(neighbor => {
        inDegree[neighbor]--;
      });
    });
  }

  return layers;
}
