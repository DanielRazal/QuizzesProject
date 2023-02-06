import { Answer } from "./answer";
import { QuestionType } from "./questionType";

export class Question {
  id: string = "";
  title: string = "";
  lastUpdate: string = "";
  textBelow: string = "";
  type!: QuestionType;
  tags: string[] = [];
  answers:Answer[] = [];
}
