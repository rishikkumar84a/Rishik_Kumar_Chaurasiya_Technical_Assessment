import { BaseNode } from './BaseNode';

export class FilterNode extends BaseNode {
    constructor(id, position) {
        super(id, 'filterNode', 'Filter', position);

        this.addHandle('input', 'input', 'Input');
        this.addHandle('output', 'output', 'Output');

        this.setConfig({
            condition: 'contains',
            value: ''
        });
    }
}
