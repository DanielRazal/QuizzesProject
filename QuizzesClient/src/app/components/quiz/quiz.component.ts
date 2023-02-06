import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  title: string = "Manage Quizess";
  quizzes: Quiz[] = [];
  quiz!: Quiz;
  searchText: any;

  constructor(private quizService: QuizService, private router: Router
    ,private swalService: SwalService) {
  }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes() {
    this.quizService.getAllQuizzes()
    .subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  handleCopyButton(id: string) {
    const link = window.location.origin + '/student';
    const tempInput = document.createElement("input");
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    this.quizService.getQuizById(id)
      .subscribe((quiz) => {
        this.quiz = quiz;
        localStorage.setItem("quizIdStudentPage", JSON.stringify(id));
      });
  }

  deleteQuiz(id: string) {
    this.quizService.deleteQuiz(id)
      .subscribe(() => { })
    window.location.reload();
  }


  showDetails(id: string) {
    this.quizService.getQuizById(id)
      .subscribe((res) => {
        let quizString = `<span style="color:black">ID:\n</span> <span style="font-size:20px">${res.id}</span>\n<span style="color:black">Quiz:</span>\n${res.name}\n<span style="color:black">Questions:</span>\n`;
        res.questions.forEach(question => {
          quizString += `${question.title}\n`;
          quizString += '<span style="color:black">Answers:</span>\n';
          question.answers.forEach(answer => {
            if (answer.isCorrect) {
              quizString += `<span style="color:green">${answer.text}</span>\n`;
            } else {
              quizString += `<span style="color:red">${answer.text}</span>\n`;
            }

          })
        })
        this.swalService.messageToUser(quizString);
      });
  }

  nav(quiz: Quiz, nav: string) {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    this.router.navigate([`${nav}`]);
  }
}
