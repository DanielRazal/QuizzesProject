import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  questions: Question[] = [];
  searchText: any;
  title: string = "Manage Questions";

  constructor(private questionService: QuestionService, private router: Router
    ,private swalService: SwalService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getAllQuestions()
      .subscribe((questions) => {
        this.questions = questions;
      });
  }

  deleteQuestion(id: string) {
    this.questionService.deleteQuestion(id)
      .subscribe(() => { },
        (error) => {
          if (error.status === 400) {
            this.swalService.messageToUser(JSON.stringify(error.error));
          }
          else window.location.reload();
        }
      );
  }

  showDetails(id: string) {
    this.questionService.getQuestionById(id)
      .subscribe((res) => {
        let questionString = `<span style="color:black">ID:\n</span> <span style="font-size:20px">${res.id}</span>\n <span style="color:black">Question:</span>\n ${res.title}\n<span style="color:black">Answers:</span>\n`;
        res.answers.forEach(answer => {
          if (answer.isCorrect) {
            questionString += `<span style="color:green">${answer.text}</span>\n`;
          } else {
            questionString += `<span style="color:red">${answer.text}</span>\n`;
          }
        });
        this.swalService.messageToUser(questionString);
      });
  }

  nav(question: Question, route: string) {
    localStorage.setItem("question", JSON.stringify(question));
    this.router.navigate([`${route}`]);
  }
}
