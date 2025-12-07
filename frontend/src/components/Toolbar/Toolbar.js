import React from 'react';
import { DraggableNode } from './DraggableNode';
import './Toolbar.css';

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <span className="section-title">Base Nodes</span>
        <div className="toolbar-items">
          <DraggableNode type='inputNode' label='Input' icon="📥" />
          <DraggableNode type='outputNode' label='Output' icon="📤" />
          <DraggableNode type='textNode' label='Text' icon="📝" />
          <DraggableNode type='llmNode' label='LLM' icon="🤖" />
        </div>
      </div>

      <div className="toolbar-separator"></div>

      <div className="toolbar-section">
        <span className="section-title">Logic Nodes</span>
        <div className="toolbar-items">
          <DraggableNode type='filterNode' label='Filter' icon="🔍" />
          <DraggableNode type='transformNode' label='Transform' icon="🔄" />
          <DraggableNode type='combineNode' label='Combine' icon="➕" />
        </div>
      </div>

      <div className="toolbar-separator"></div>

      <div className="toolbar-section">
        <span className="section-title">Utility Nodes</span>
        <div className="toolbar-items">
          <DraggableNode type='noteNode' label='Note' icon="📌" />
          <DraggableNode type='apiNode' label='API' icon="🌐" />
        </div>
      </div>
    </div>
  );
};
