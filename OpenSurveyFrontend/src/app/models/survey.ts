import { Question } from './question';

export class Survey {
  isCompleted?: boolean;
  id?: number;
  name!: string;
  description!: string;
  published: boolean = false;
  deadline!: Date;
  userGroups?: string;
  questions!: Question[];
}
