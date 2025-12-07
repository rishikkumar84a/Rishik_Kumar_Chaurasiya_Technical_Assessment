import React from 'react';

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={`draggable-node ${type}`}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
        >
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
        </div>
    );
};
