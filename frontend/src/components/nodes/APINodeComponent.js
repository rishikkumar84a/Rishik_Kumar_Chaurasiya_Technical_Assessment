import React, { memo, useState } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const APINodeComponent = memo(({ data, id }) => {
    const updateNode = useStore(state => state.updateNode);
    const [method, setMethod] = useState(data.config?.method || 'GET');
    const [url, setUrl] = useState(data.config?.url || 'https://api.example.com');

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
        updateNode(id, { config: { ...data.config, method: e.target.value } });
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        updateNode(id, { config: { ...data.config, url: e.target.value } });
    };

    return (
        <BaseNodeComponent id={id} data={data} icon="🌐" title="API" className="api-node">
            <div className="input-group">
                <label>Method:</label>
                <select value={method} onChange={handleMethodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div className="input-group">
                <label>URL:</label>
                <input type="text" value={url} onChange={handleUrlChange} />
            </div>
        </BaseNodeComponent>
    );
});

APINodeComponent.displayName = 'APINode';
