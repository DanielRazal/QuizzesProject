import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { Quiz } from 'src/app/models/quiz';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';
import { QuizService } from 'src/app/services/quiz.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-quiz-structure',
  templateUrl: './quiz-structure.component.html',
  styleUrls: ['./quiz-structure.component.css']
})
export class QuizStructureComponent implements OnInit, OnDestroy {
  quiz!: Quiz;
  currentQuestion = 0;
  selectedAnswers: Answer[][] = [];
  studentId = "";
  status: string = "";
  type: string = "";
  addCompletedQuizForm: FormGroup = new FormGroup({});
  selectedAnswersByQuestion: Answer[][] = [];
  errorMessage: string = "";


  constructor(private quizService: QuizService, private formBuilder: FormBuilder,
    private completedQuizService: CompletedQuizService,
    private router: Router) { }


  isActive(isActive: boolean) {
    this.quizService.updateQuiz(this.quiz.id, { ...this.quiz, isActive: isActive }).subscribe(() => {
      this.quizService.getQuizById(this.quiz.id).subscribe((updatedQuiz) => {
        this.quiz = updatedQuiz;
      });
    });
  }

  ngOnInit(): void {
    window.onbeforeunload = () => {
      this.isActive(false);
    }
    let id = JSON.parse(localStorage.getItem("quizIdStructure")!);
    if (id) {
      this.quizService.getQuizById(id)
        .subscribe((quiz) => {
          this.quiz = quiz;
          this.isActive(true);
          for (let i = 0; i < quiz.questions.length; i++) {
            if (quiz.questions[i].type.id === "1") {
              this.type = "radio";
            }
            else this.type = "checkbox";
          }
        });
    }
    this.studentId = JSON.parse(localStorage.getItem("studentIdQuizStructure")!);
    this.addCompletedQuizForm = this.formBuilder.group({});
  }

  ngOnDestroy(): void {
    window.onbeforeunload = () => {
      this.isActive(false);
    }
    this.isActive(false);
    localStorage.removeItem("quizIdStructure");
    localStorage.removeItem("studentIdQuizStructure");
  }

  addCompletedQuiz() {
    let quizData = this.addCompletedQuizForm.value;
    const newGuid = uuidv4();
    quizData["id"] = newGuid;
    quizData["studentId"] = this.studentId;
    quizData["quizId"] = this.quiz.id;
    let correctAnswers = 0;

    for (let i = 0; i < this.selectedAnswers.length; i++) {
      if (this.selectedAnswers[i]) {
        for (let j = 0; j < this.selectedAnswers[i].length; j++) {
          this.selectedAnswers[i][j].questionText = this.quiz.questions[i].title;
          if (this.selectedAnswers[i][j].isCorrect) {
            correctAnswers++;
          }
        }
      }
    }
    this.selectedAnswers = this.selectedAnswers.filter(answer => answer !== null);

    quizData["selectedAnswers"] = this.selectedAnswers;
    quizData['score'] = Math.round((correctAnswers / this.quiz.questions.length) * 100);
    if (quizData['score'] > 100) {
      quizData['score'] = 100;
    }

    if (this.quiz.passingGrade < quizData['score']) {
      this.status = this.quiz.msgOnSuccess;
    }
    else if (this.quiz.passingGrade > quizData['score']) {
      this.status = this.quiz.msgOnFailure;
    }

    this.completedQuizService.addCompletedQuiz(quizData)
      .subscribe(() => {
      }, (error) => {
        if (error.status === 200) {
          this.addCompletedQuizForm.reset();
          localStorage.setItem("quizId", JSON.stringify(quizData.id));
          localStorage.setItem("dataStudent", JSON.stringify
            ({ score: quizData['score'], status: this.status, correctAnswers: correctAnswers }));
          this.router.navigate(['result']);
        }
      });
  }

  updateSelectedQuestions(answer: Answer, event: any) {
    if (event.target.checked) {
      if (!this.selectedAnswers[this.currentQuestion]) {
        this.selectedAnswers[this.currentQuestion] = [];
      }
      const type = this.quiz.questions[this.currentQuestion].type.id === "1" ? "radio" : "checkbox";

      if (type === "radio") {
        this.selectedAnswers[this.currentQuestion] = [];
        this.selectedAnswers[this.currentQuestion].push(answer);
      } else {
        this.selectedAnswers[this.currentQuestion].push(answer);
      }
    } else {
      this.selectedAnswers[this.currentQuestion] = this.selectedAnswers[this.currentQuestion].filter(x => x !== answer);
    }
  }


  nextQuestion() {
    if (this.currentQuestion < this.quiz.questions.length - 1) {
      this.selectedAnswersByQuestion[this.currentQuestion] = this.selectedAnswers[this.currentQuestion];
      this.currentQuestion++;
    }
  }
  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.selectedAnswersByQuestion[this.currentQuestion] = this.selectedAnswers[this.currentQuestion];
      this.currentQuestion--;
    }
  }
}
