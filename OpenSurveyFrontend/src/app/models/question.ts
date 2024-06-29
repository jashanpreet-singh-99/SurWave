import { Option } from './option';

export class Question {
  id?: number;
  questionText!: string;
  options!: Option[];
}
