import React, { memo, useState, useEffect } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const InputNodeComponent = memo(({ data, id }) => {
  const [currName, setCurrName] = useState(data.config?.inputName || data.id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.config?.inputType || 'Text');
  const updateNode = useStore(state => state.updateNode);

  useEffect(() => {
    // Ensure initial config is set if missing
    if (!data.config?.inputName || !data.config?.inputType) {
      updateNode(id, {
        config: { inputName: currName, inputType: inputType }
      });
    }
  }, [id, data.config, currName, inputType, updateNode]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNode(id, { config: { ...data.config, inputName: e.target.value } });
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNode(id, { config: { ...data.config, inputType: e.target.value } });
  };

  return (
    <BaseNodeComponent id={id} data={data} icon="📥" title="Input" className="input-node">
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </div>
      <div className="input-group">
        <label>Type:</label>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNodeComponent>
  );
});

InputNodeComponent.displayName = 'InputNode';
