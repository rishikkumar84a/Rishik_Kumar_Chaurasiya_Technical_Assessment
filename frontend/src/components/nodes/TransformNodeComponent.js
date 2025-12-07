import React, { memo, useState } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const TransformNodeComponent = memo(({ data, id }) => {
    const updateNode = useStore(state => state.updateNode);
    const [type, setType] = useState(data.config?.type || 'uppercase');

    const handleTypeChange = (e) => {
        setType(e.target.value);
        updateNode(id, { config: { ...data.config, type: e.target.value } });
    };

    return (
        <BaseNodeComponent id={id} data={data} icon="🔄" title="Transform" className="transform-node">
            <div className="input-group">
                <label>Type:</label>
                <select value={type} onChange={handleTypeChange}>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                    <option value="reverse">Reverse</option>
                </select>
            </div>
        </BaseNodeComponent>
    );
});

TransformNodeComponent.displayName = 'TransformNode';
