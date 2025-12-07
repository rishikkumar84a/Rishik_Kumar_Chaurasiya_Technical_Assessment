/**
 * Graph utility functions
 */

/**
 * Find connected components in graph
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Array of components (each component is array of node IDs)
 */
export function findConnectedComponents(edges, nodes) {
  const graph = {};
  const reverseGraph = {};

  // Initialize
  nodes.forEach(node => {
    graph[node.id] = [];
    reverseGraph[node.id] = [];
  });

  // Build undirected graph representation
  edges.forEach(edge => {
    graph[edge.source].push(edge.target);
    reverseGraph[edge.target].push(edge.source);
  });

  const visited = new Set();
  const components = [];

  function dfs(nodeId, component) {
    visited.add(nodeId);
    component.push(nodeId);

    // Visit outgoing edges
    (graph[nodeId] || []).forEach(neighbor => {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    });

    // Visit incoming edges
    (reverseGraph[nodeId] || []).forEach(neighbor => {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    });
  }

  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      const component = [];
      dfs(node.id, component);
      components.push(component);
    }
  });

  return components;
}

/**
 * Find nodes with no incoming edges (sources)
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Array of source node IDs
 */
export function findSourceNodes(edges, nodes) {
  const nodesWithIncoming = new Set(edges.map(e => e.target));
  return nodes.filter(node => !nodesWithIncoming.has(node.id)).map(n => n.id);
}

/**
 * Find nodes with no outgoing edges (sinks)
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Array of sink node IDs
 */
export function findSinkNodes(edges, nodes) {
  const nodesWithOutgoing = new Set(edges.map(e => e.source));
  return nodes.filter(node => !nodesWithOutgoing.has(node.id)).map(n => n.id);
}

/**
 * Get all ancestors of a node
 * @param {string} nodeId - Node ID
 * @param {Array} edges - Array of edges
 * @returns {Set} - Set of ancestor node IDs
 */
export function getAncestors(nodeId, edges) {
  const ancestors = new Set();
  const queue = [nodeId];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    // Find all nodes that point to current
    edges.forEach(edge => {
      if (edge.target === current && edge.source !== nodeId) {
        ancestors.add(edge.source);
        queue.push(edge.source);
      }
    });
  }

  return ancestors;
}

/**
 * Get all descendants of a node
 * @param {string} nodeId - Node ID
 * @param {Array} edges - Array of edges
 * @returns {Set} - Set of descendant node IDs
 */
export function getDescendants(nodeId, edges) {
  const descendants = new Set();
  const queue = [nodeId];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    // Find all nodes that current points to
    edges.forEach(edge => {
      if (edge.source === current && edge.target !== nodeId) {
        descendants.add(edge.target);
        queue.push(edge.target);
      }
    });
  }

  return descendants;
}
