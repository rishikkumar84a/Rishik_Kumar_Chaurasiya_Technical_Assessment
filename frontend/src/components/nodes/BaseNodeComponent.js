import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

/**
 * BaseNodeComponent - Shared UI wrapper for all nodes
 * Handles:
 * - Container styling
 * - Header (Icon + Label)
 * - Input/Output Handles rendering
 * - Content container
 */
export const BaseNodeComponent = memo(({
    id,
    data,
    children,
    icon,
    title,
    style = {},
    className = ''
}) => {
    const inputs = data.handles?.inputs || [];
    const outputs = data.handles?.outputs || [];

    return (
        <div className={`custom-node ${className}`} style={style}>
            {/* Node Header */}
            <div className="node-header">
                {icon && <span className="node-icon">{icon}</span>}
                <span className="node-title">{title || data.label}</span>
            </div>

            {/* Node Content */}
            <div className="node-content">
                {children}
            </div>

            {/* Input Handles (Left) */}
            <div className="handles-left">
                {inputs.map((handle, index) => (
                    <Handle
                        key={handle.id}
                        type="target"
                        position={Position.Left}
                        id={handle.id}
                        className="custom-handle input-handle"
                        style={{ top: `${(index + 1) * (100 / (inputs.length + 1))}%` }}
                    >
                        {handle.label && <span className="handle-label left">{handle.label}</span>}
                    </Handle>
                ))}
            </div>

            {/* Output Handles (Right) */}
            <div className="handles-right">
                {outputs.map((handle, index) => (
                    <Handle
                        key={handle.id}
                        type="source"
                        position={Position.Right}
                        id={handle.id}
                        className="custom-handle output-handle"
                        style={{ top: `${(index + 1) * (100 / (outputs.length + 1))}%` }}
                    >
                        {handle.label && <span className="handle-label right">{handle.label}</span>}
                    </Handle>
                ))}
            </div>
        </div>
    );
});

BaseNodeComponent.displayName = 'BaseNodeComponent';
