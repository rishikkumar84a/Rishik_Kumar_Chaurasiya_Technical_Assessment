import React, { memo, useState } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const FilterNodeComponent = memo(({ data, id }) => {
    const updateNode = useStore(state => state.updateNode);
    const [condition, setCondition] = useState(data.config?.condition || 'contains');
    const [value, setValue] = useState(data.config?.value || '');

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
        updateNode(id, { config: { ...data.config, condition: e.target.value } });
    };

    const handleValueChange = (e) => {
        setValue(e.target.value);
        updateNode(id, { config: { ...data.config, value: e.target.value } });
    };

    return (
        <BaseNodeComponent id={id} data={data} icon="🔍" title="Filter" className="filter-node">
            <div className="input-group">
                <label>Condition:</label>
                <select value={condition} onChange={handleConditionChange}>
                    <option value="contains">Contains</option>
                    <option value="equals">Equals</option>
                    <option value="starts_with">Starts With</option>
                    <option value="ends_with">Ends With</option>
                </select>
            </div>
            <div className="input-group">
                <label>Value:</label>
                <input type="text" value={value} onChange={handleValueChange} />
            </div>
        </BaseNodeComponent>
    );
});

FilterNodeComponent.displayName = 'FilterNode';
