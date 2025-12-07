/**
 * DAG Validator - Detects cycles in directed graphs
 * Uses Depth-First Search (DFS) algorithm
 */

/**
 * Check if graph contains cycles
 * @param {Array} edges - Array of edge objects
 * @param {Array} nodes - Array of node objects
 * @returns {boolean} - True if DAG (no cycles), false if cycles exist
 */
export function isDAG(edges, nodes) {
  if (nodes.length === 0) return true;
  if (edges.length === 0) return true;

  // Build adjacency list
  const graph = buildAdjacencyList(edges, nodes);
  
  // Track visited nodes and nodes in current recursion stack
  const visited = new Set();
  const recStack = new Set();

  /**
   * DFS helper to detect cycles
   * @param {string} nodeId - Current node ID
   * @returns {boolean} - True if cycle detected
   */
  function hasCycle(nodeId) {
    // Mark current node as visiting
    visited.add(nodeId);
    recStack.add(nodeId);

    // Visit all neighbors
    const neighbors = graph[nodeId] || [];
    for (const neighbor of neighbors) {
      // If neighbor not visited, recurse
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      }
      // If neighbor in current path, cycle found
      else if (recStack.has(neighbor)) {
        return true;
      }
    }

    // Remove from recursion stack (backtrack)
    recStack.delete(nodeId);
    return false;
  }

  // Check all nodes (handles disconnected components)
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) {
        return false; // Cycle detected
      }
    }
  }

  return true; // No cycles, valid DAG
}

/**
 * Build adjacency list representation of graph
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Object} - Adjacency list
 */
export function buildAdjacencyList(edges, nodes) {
  const graph = {};
  
  // Initialize with all nodes
  nodes.forEach(node => {
    graph[node.id] = [];
  });

  // Add edges
  edges.forEach(edge => {
    if (!graph[edge.source]) {
      graph[edge.source] = [];
    }
    graph[edge.source].push(edge.target);
  });

  return graph;
}

/**
 * Find all cycles in the graph (for detailed error reporting)
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Array of cycles (each cycle is array of node IDs)
 */
export function findCycles(edges, nodes) {
  const graph = buildAdjacencyList(edges, nodes);
  const visited = new Set();
  const recStack = new Set();
  const path = [];
  const cycles = [];

  function dfs(nodeId) {
    visited.add(nodeId);
    recStack.add(nodeId);
    path.push(nodeId);

    const neighbors = graph[nodeId] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      } else if (recStack.has(neighbor)) {
        // Cycle found - extract the cycle
        const cycleStart = path.indexOf(neighbor);
        const cycle = path.slice(cycleStart);
        cycles.push([...cycle, neighbor]);
      }
    }

    path.pop();
    recStack.delete(nodeId);
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id);
    }
  }

  return cycles;
}

/**
 * Validate edge connection rules
 * @param {Object} sourceNode - Source node
 * @param {Object} targetNode - Target node
 * @param {string} sourceHandle - Source handle ID
 * @param {string} targetHandle - Target handle ID
 * @returns {Object} - Validation result
 */
export function validateConnection(sourceNode, targetNode, sourceHandle, targetHandle) {
  const errors = [];

  // Prevent self-loops
  if (sourceNode.id === targetNode.id) {
    errors.push('Cannot connect node to itself');
  }

  // Validate handles exist
  const sourceHandleExists = sourceNode.data.handles.outputs.some(h => h.id === sourceHandle);
  const targetHandleExists = targetNode.data.handles.inputs.some(h => h.id === targetHandle);

  if (!sourceHandleExists) {
    errors.push('Source handle does not exist');
  }

  if (!targetHandleExists) {
    errors.push('Target handle does not exist');
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}
