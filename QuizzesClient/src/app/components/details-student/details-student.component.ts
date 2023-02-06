import { Component, OnInit } from '@angular/core';
import { CompletedQuiz } from 'src/app/models/completedQuiz';
import { Student } from 'src/app/models/student';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';

@Component({
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {
  completedQuizzes: CompletedQuiz[] = [];
  average: number = -1;
  totalScore: number = 0;
  student!: Student;
  searchText: any;
  selectedQuiz!: CompletedQuiz;
  studentSelected = false;

  constructor(private completedQuizService: CompletedQuizService) { }

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem("student")!);
    this.getCompletedQuizzes();
  }

  getCompletedQuizzes() {
    this.completedQuizService.getAllCompletedQuizzesByStudent(this.student.id).subscribe((completedQuizzes) => {
      this.completedQuizzes = completedQuizzes;
      this.completedQuizzes.forEach((quiz) => {
        this.totalScore += quiz.score;
      });
      this.average = this.totalScore / this.completedQuizzes.length;
    });
  }

  showAnsweredQuestions(completedQuiz: CompletedQuiz) {
    this.selectedQuiz = completedQuiz;
    this.studentSelected = true;
  }
}
