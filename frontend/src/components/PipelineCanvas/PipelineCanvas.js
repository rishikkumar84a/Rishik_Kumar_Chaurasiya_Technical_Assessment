import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../../store';
import { nodeTypes } from '../nodes';
import './PipelineCanvas.css';

/**
 * PipelineCanvas Component - Main drag-and-drop canvas
 */
const PipelineCanvasContent = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes: storeNodes,
    edges: storeEdges,
    addNode: storeAddNode,
    addEdge: storeAddEdge,
    deleteNode,
    deleteEdge,
    updateNodePosition,
    validateGraph,
  } = useStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync store to React Flow
  useEffect(() => {
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);

  useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  // Validate when store changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (storeNodes.length > 0 || storeEdges.length > 0) {
      validateGraph();
    }
  }, [storeNodes, storeEdges]);

  const onConnect = useCallback(
    (params) => {
      const edge = {
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        type: 'default',
      };
      storeAddEdge(edge);
    },
    [storeAddEdge]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      deleted.forEach((node) => deleteNode(node.id));
    },
    [deleteNode]
  );

  const onEdgesDelete = useCallback(
    (deleted) => {
      deleted.forEach((edge) => deleteEdge(edge.id));
    },
    [deleteEdge]
  );

  const onNodeDragStop = useCallback(
    (event, node) => {
      updateNodePosition(node.id, node.position);
    },
    [updateNodePosition]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      storeAddNode(type, position);
    },
    [reactFlowInstance, storeAddNode]
  );

  return (
    <div className="pipeline-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onNodeDragStop={onNodeDragStop}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background variant="dots" gap={16} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'inputNode': return '#e8f5e9';
              case 'outputNode': return '#fff3e0';
              case 'textNode': return '#f3e5f5';
              case 'llmNode': return '#e3f2fd';
              default: return '#f8f9fa';
            }
          }}
          nodeBorderRadius={8}
        />
      </ReactFlow>
    </div>
  );
};

export const PipelineCanvas = () => (
  <ReactFlowProvider>
    <PipelineCanvasContent />
  </ReactFlowProvider>
);
