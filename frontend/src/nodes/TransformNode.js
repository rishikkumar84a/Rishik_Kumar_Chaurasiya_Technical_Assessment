import { BaseNode } from './BaseNode';

export class TransformNode extends BaseNode {
    constructor(id, position) {
        super(id, 'transformNode', 'Transform', position);

        this.addHandle('input', 'input', 'Input');
        this.addHandle('output', 'output', 'Output');

        this.setConfig({
            type: 'uppercase'
        });
    }
}
