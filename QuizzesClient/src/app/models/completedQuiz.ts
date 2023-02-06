import { Answer } from "./answer";
import { Quiz } from "./quiz";
import { Student } from "./student";

export class CompletedQuiz {
  id: string = "";
  score:number = -1;
  doneDate:string = "";
  selectedAnswers: Answer[][] = [];
  student!:Student;
  quiz!:Quiz;
}
