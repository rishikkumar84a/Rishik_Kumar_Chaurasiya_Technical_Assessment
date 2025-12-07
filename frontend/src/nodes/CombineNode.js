import { BaseNode } from './BaseNode';

export class CombineNode extends BaseNode {
    constructor(id, position) {
        super(id, 'combineNode', 'Combine', position);

        this.addHandle('input', 'input1', 'Input 1');
        this.addHandle('input', 'input2', 'Input 2');
        this.addHandle('output', 'output', 'Output');

        this.setConfig({
            separator: ' '
        });
    }
}
