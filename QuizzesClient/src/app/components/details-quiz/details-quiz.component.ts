import { Component, OnInit } from '@angular/core';
import { CompletedQuiz } from 'src/app/models/completedQuiz';
import { Quiz } from 'src/app/models/quiz';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-details-quiz',
  templateUrl: './details-quiz.component.html',
  styleUrls: ['./details-quiz.component.css']
})
export class DetailsQuizComponent implements OnInit {
  quiz!: Quiz;
  quizId: any;
  completedQuizzes: CompletedQuiz[] = [];
  passingPercentage: number = 0;
  passingStudents: number = 0;
  averageGrade: number = 0
  selectedQuiz!: CompletedQuiz
  studentSelected = false;
  dateRangeChecked = false;
  selectedQuizId:any;

  constructor(private quizService: QuizService ,private completedQuizService: CompletedQuizService) { }

  ngOnInit(): void {
    this.selectedQuizId = JSON.parse(localStorage.getItem("selectedQuizId")!);
    this.dateRangeChecked = JSON.parse(localStorage.getItem("dateRangeChecked")!);
    if (this.selectedQuizId) {
      this.quizService.getQuizById(this.selectedQuizId)
        .subscribe((quiz) => {
          this.quiz = quiz;
        });
    }
    this.getAllCompletedQuizzes();
  }

  showAnsweredQuestions(quiz: CompletedQuiz) {
    this.selectedQuiz = quiz;
    this.studentSelected = true;
  }

  getAllCompletedQuizzes() {
    this.completedQuizService.getAllCompletedQuizzes().subscribe((completedQuizzes) => {
      this.completedQuizzes = completedQuizzes
      this.calculatePassingPercentage();
      this.calculateAverageGrade();
    })
  }

  calculatePassingPercentage() {
    if (this.completedQuizzes.length) {
      const passingQuizzes = this.completedQuizzes.filter(quiz => quiz.score >= this.quiz.passingGrade);
      this.passingStudents = passingQuizzes.length;
      this.passingPercentage = (passingQuizzes.length / this.completedQuizzes.length) * 100;
    }
  }

  calculateAverageGrade() {
    if (this.completedQuizzes.length) {
      let totalScore = 0;
      this.completedQuizzes.forEach(quiz => {
        totalScore += quiz.score;
      });
      this.averageGrade = totalScore / this.completedQuizzes.length;
    }
  }
}
