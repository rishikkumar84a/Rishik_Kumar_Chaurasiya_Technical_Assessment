import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';
import { useStore } from '../../store';

export const TextNodeComponent = memo(({ data, id }) => {
  const updateNode = useStore(state => state.updateNode);
  const [text, setText] = useState(data.config?.text || '');
  const textareaRef = useRef(null);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Extract variables from text
  const extractVariables = useCallback((text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const variables = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const varName = match[1];
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    }

    return variables;
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Dynamic resizing based on content
    const lines = newText.split('\n').length;
    // Base height + line height * lines (approximate)
    const newHeight = Math.max(100, 80 + (lines * 20));
    // Base width + char width (approximate)
    const newWidth = Math.max(200, Math.min(400, 200 + (newText.length / lines) * 8));

    // Extract variables and update handles
    const variables = extractVariables(newText);
    const inputs = variables.map(varName => ({
      id: varName,
      label: varName,
      type: 'input'
    }));

    updateNode(id, {
      config: { ...data.config, text: newText, width: newWidth, height: newHeight },
      handles: {
        inputs: inputs,
        outputs: [{ id: 'output', label: 'Output', type: 'output' }]
      }
    });
  };

  return (
    <BaseNodeComponent
      id={id}
      data={data}
      icon="📝"
      title="Text"
      className="text-node"
      style={{ width: data.config?.width, minHeight: data.config?.height }}
    >
      <div className="input-group">
        <label>Text:</label>
        <textarea
          ref={textareaRef}
          className="text-input"
          value={text}
          onChange={handleTextChange}
          placeholder="Type {{variable}} to create inputs..."
          rows={1}
          style={{ overflow: 'hidden', resize: 'none' }}
        />
      </div>
    </BaseNodeComponent>
  );
});

TextNodeComponent.displayName = 'TextNode';
