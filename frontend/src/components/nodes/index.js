import { InputNodeComponent } from './InputNodeComponent';
import { OutputNodeComponent } from './OutputNodeComponent';
import { TextNodeComponent } from './TextNodeComponent';
import { LLMNodeComponent } from './LLMNodeComponent';
import { FilterNodeComponent } from './FilterNodeComponent';
import { TransformNodeComponent } from './TransformNodeComponent';
import { CombineNodeComponent } from './CombineNodeComponent';
import { NoteNodeComponent } from './NoteNodeComponent';
import { APINodeComponent } from './APINodeComponent';

export const nodeTypes = {
  inputNode: InputNodeComponent,
  outputNode: OutputNodeComponent,
  textNode: TextNodeComponent,
  llmNode: LLMNodeComponent,
  filterNode: FilterNodeComponent,
  transformNode: TransformNodeComponent,
  combineNode: CombineNodeComponent,
  noteNode: NoteNodeComponent,
  apiNode: APINodeComponent
};
