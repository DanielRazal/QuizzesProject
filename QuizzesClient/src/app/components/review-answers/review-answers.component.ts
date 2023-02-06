import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompletedQuiz } from 'src/app/models/completedQuiz';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';


@Component({
  selector: 'app-review-answers',
  templateUrl: './review-answers.component.html',
  styleUrls: ['./review-answers.component.css']
})
export class ReviewAnswersComponent implements OnInit{

  completedQuiz!: CompletedQuiz
  title: string = "Review Answers of Student: ";
  score: number = 0;
  status: string = "";
  correctAnswers: number = 0;
  quizId: any;
  dataStudent: any;

  constructor(private router: Router,
    private completedQuizService: CompletedQuizService) { }

  ngOnInit(): void {

    this.completedQuiz = JSON.parse(localStorage.getItem("reviewCompletedQuiz")!);
    this.dataStudent = JSON.parse(localStorage.getItem("reviewDataStudent")!);

    this.completedQuizService.getCompletedQuizById(this.completedQuiz.id)
      .subscribe((completedQuiz) => {
        this.completedQuiz = completedQuiz;
      });
  }


  nav() {
    this.router.navigate([`result`]);
  }
}
