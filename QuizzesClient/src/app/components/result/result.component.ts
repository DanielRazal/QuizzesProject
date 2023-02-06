import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompletedQuiz } from 'src/app/models/completedQuiz';
import { Quiz } from 'src/app/models/quiz';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  score: number = 0;
  status: string = "";
  correctAnswers: number = 0;
  quiz!: Quiz;
  completedQuiz!: CompletedQuiz;
  dataStudent: any;
  quizId: any;
  backDataStudent:any;
  backCompletedQuiz:any;

  constructor(private router: Router,
    private completedQuizService: CompletedQuizService) { }

  ngOnInit(): void {

    this.quizId = JSON.parse(localStorage.getItem("quizId")!);
    this.dataStudent = JSON.parse(localStorage.getItem("dataStudent")!);
    this.completedQuiz = JSON.parse(localStorage.getItem("completedQuiz")!);

    this.completedQuizService.getCompletedQuizById(this.quizId)
      .subscribe((completedQuiz) => {
        this.completedQuiz = completedQuiz;
        console.log(this.completedQuiz.quiz.passingGrade);
      });
  }

  nav(completedQuiz: CompletedQuiz) {
    localStorage.setItem("reviewCompletedQuiz", JSON.stringify(completedQuiz));
    localStorage.setItem("reviewDataStudent", JSON.stringify
    ({ score: this.score, status: this.status, correctAnswers: this.correctAnswers }));
    this.router.navigate(['reviewAnswers']);
  }
}

