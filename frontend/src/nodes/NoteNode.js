import { BaseNode } from './BaseNode';

export class NoteNode extends BaseNode {
    constructor(id, position) {
        super(id, 'noteNode', 'Note', position);

        this.setConfig({
            text: '',
            color: '#fff9c4'
        });
    }
}
