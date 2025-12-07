import React, { memo, useState } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const NoteNodeComponent = memo(({ data, id }) => {
    const updateNode = useStore(state => state.updateNode);
    const [text, setText] = useState(data.config?.text || '');

    const handleTextChange = (e) => {
        setText(e.target.value);
        updateNode(id, { config: { ...data.config, text: e.target.value } });
    };

    return (
        <BaseNodeComponent
            id={id}
            data={data}
            icon="📌"
            title="Note"
            className="note-node"
            style={{ backgroundColor: data.config?.color || '#fff9c4' }}
        >
            <div className="input-group">
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Enter note..."
                    rows={4}
                    style={{ background: 'transparent', border: 'none' }}
                />
            </div>
        </BaseNodeComponent>
    );
});

NoteNodeComponent.displayName = 'NoteNode';
