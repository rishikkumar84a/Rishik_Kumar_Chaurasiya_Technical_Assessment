import { BaseNode } from './BaseNode';

export class APINode extends BaseNode {
    constructor(id, position) {
        super(id, 'apiNode', 'API', position);

        this.addHandle('input', 'input', 'Payload');
        this.addHandle('output', 'response', 'Response');

        this.setConfig({
            method: 'GET',
            url: 'https://api.example.com'
        });
    }
}
