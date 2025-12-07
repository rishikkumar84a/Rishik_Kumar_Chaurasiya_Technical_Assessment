import React, { memo, useState } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const CombineNodeComponent = memo(({ data, id }) => {
    const updateNode = useStore(state => state.updateNode);
    const [separator, setSeparator] = useState(data.config?.separator || ' ');

    const handleSeparatorChange = (e) => {
        setSeparator(e.target.value);
        updateNode(id, { config: { ...data.config, separator: e.target.value } });
    };

    return (
        <BaseNodeComponent id={id} data={data} icon="➕" title="Combine" className="combine-node">
            <div className="input-group">
                <label>Separator:</label>
                <input type="text" value={separator} onChange={handleSeparatorChange} placeholder="Space, comma, etc." />
            </div>
        </BaseNodeComponent>
    );
});

CombineNodeComponent.displayName = 'CombineNode';
