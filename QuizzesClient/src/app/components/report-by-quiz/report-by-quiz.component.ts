import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CompletedQuiz } from 'src/app/models/completedQuiz';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-report-by-quiz',
  templateUrl: './report-by-quiz.component.html',
  styleUrls: ['./report-by-quiz.component.css']
})
export class ReportByQuizComponent implements OnInit {

  fromDate: string = "";
  toDate: string = "";
  completedQuizzes: CompletedQuiz[] = [];
  selectedQuizId: string = "";
  dateRangeChecked: boolean = true;

  constructor(private router: Router, private completedQuizService: CompletedQuizService
    , private swalService: SwalService) { }

  ngOnInit(): void {
    this.getAllCompletedQuizzes();
  }
  getSelectedQuizId(id: string) {
    this.selectedQuizId = id;
  }

  submit() {
    let selectedQuiz = this.completedQuizzes.find(quiz => quiz.quiz.id == this.selectedQuizId);
    let selectedQuizName = selectedQuiz ? selectedQuiz.quiz.name : "";
    if (this.dateRangeChecked) {
      let filteredQuizzes = this.completedQuizzes.filter(completedQuiz => {
        if (completedQuiz.quiz.name === selectedQuizName) {
          return true;
        }
        return false;
      });
      if (filteredQuizzes.length > 0) {
        localStorage.setItem("selectedQuizId", JSON.stringify(this.selectedQuizId));
        localStorage.setItem("dateRangeChecked", JSON.stringify(this.dateRangeChecked));
        this.router.navigate(['detailsQuiz'])
          .then(() => {
            window.location.reload();
          });
      } else {
        this.swalService.messageToUser("No quizzes match the selected quiz name.")
      }
    } else {
      let from = new Date(this.fromDate);
      let to = new Date(this.toDate);
      if (!from || !to || isNaN(from.getTime()) || isNaN(to.getTime())) {
        this.swalService.messageToUser("Please enter a valid date range.");
        return;
      }
      let filteredQuizzes = this.completedQuizzes.filter(completedQuiz => {
        let doneDate = moment(completedQuiz.doneDate, "DD/MM/YYYY HH:mm:ss").toDate();
        if (completedQuiz.quiz.name === selectedQuizName
          && doneDate >= from
          && doneDate <= to) {
          return true;
        }
        return false;
      });
      if (filteredQuizzes.length > 0) {
        localStorage.setItem("selectedQuizId", JSON.stringify(this.selectedQuizId));
        localStorage.setItem("dateRangeChecked", JSON.stringify(this.dateRangeChecked));
        this.router.navigate(['detailsQuiz'])
          .then(() => {
            window.location.reload();
          });
      } else {
        this.swalService.messageToUser("No quizzes match the specified date range and selected quiz name.")
      }
    }
  }

  getAllCompletedQuizzes() {
    this.completedQuizService.getAllCompletedQuizzes().subscribe((completedQuizzes) => {
      let uniqueQuizIds = new Set();
      this.completedQuizzes = completedQuizzes.filter(completedQuiz => {
        if (uniqueQuizIds.has(completedQuiz.quiz.id)) {
          return false;
        }
        uniqueQuizIds.add(completedQuiz.quiz.id);
        return true;
      });
    })
  }
}
