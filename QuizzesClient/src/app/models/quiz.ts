import { Language } from "./language";
import { Question } from "./question";
import { QuizType } from "./quizType";

export class Quiz {
  id: string = "";
  name: string = "";
  lastUpdate: string = "";
  language!: Language;
  type!: QuizType;
  questions: Question[] = [];
  showAnswers: boolean = false;
  passingGrade: number = -1;
  msgOnFailure: string = ""
  msgOnSuccess: string = "";
  isActive: boolean = false;
}

