import React, { memo, useState, useEffect } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const OutputNodeComponent = memo(({ data, id }) => {
  const [currName, setCurrName] = useState(data.config?.outputName || data.id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.config?.outputType || 'Text');
  const updateNode = useStore(state => state.updateNode);

  useEffect(() => {
    if (!data.config?.outputName || !data.config?.outputType) {
      updateNode(id, {
        config: { outputName: currName, outputType: outputType }
      });
    }
  }, [id, data.config, currName, outputType, updateNode]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNode(id, { config: { ...data.config, outputName: e.target.value } });
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNode(id, { config: { ...data.config, outputType: e.target.value } });
  };

  return (
    <BaseNodeComponent id={id} data={data} icon="📤" title="Output" className="output-node">
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
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNodeComponent>
  );
});

OutputNodeComponent.displayName = 'OutputNode';
