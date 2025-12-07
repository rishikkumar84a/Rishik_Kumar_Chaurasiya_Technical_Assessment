import React, { memo } from 'react';
import { BaseNodeComponent } from './BaseNodeComponent';

export const LLMNodeComponent = memo(({ data, id }) => {
  return (
    <BaseNodeComponent id={id} data={data} icon="🤖" title="LLM" className="llm-node">
      <div className="node-info">
        <span>This is a LLM.</span>
      </div>
    </BaseNodeComponent>
  );
});

LLMNodeComponent.displayName = 'LLMNode';
