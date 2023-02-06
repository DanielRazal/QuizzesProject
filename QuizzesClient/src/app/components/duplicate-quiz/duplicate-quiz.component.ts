import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/models/language';
import { QuizTypeService } from 'src/app/services/quiz-type.service';
import { QuizType } from 'src/app/models/quizType';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { SwalService } from 'src/app/services/swal.service';


@Component({
  selector: 'app-duplicate-quiz',
  templateUrl: './duplicate-quiz.component.html',
  styleUrls: ['./duplicate-quiz.component.css']
})
export class DuplicateQuizComponent implements OnInit {
  dupQuizForm: FormGroup = new FormGroup({});
  quiz!: Quiz;
  languages: Language[] = [];
  quizTypes: QuizType[] = [];
  questions: Question[] = [];
  errorMessage: string = "";
  selectedQuestions: Question[] = [];
  totalPages = 3;
  currentPage = 1;

  constructor(private quizService: QuizService, private router: Router,
    private formBuilder: FormBuilder, private languageService: LanguageService
    , private quizTypeService: QuizTypeService, private questionService: QuestionService
    , private swalService: SwalService) { }

  ngOnInit(): void {
    this.quiz = JSON.parse(localStorage.getItem("quiz")!);

    this.dupQuizForm = this.formBuilder.group({
      name: [''],
      languageId: [''],
      typeId: [''],
      showAnswers: [false],
      passingGrade: [Number],
      msgOnFailure: [''],
      msgOnSuccess: [''],
      questions: this.formBuilder.array([this.createQuestion()])
    });
    this.getAllLanguages();
    this.getAllTypes();
    this.getAllQuestions();
  }

  getAllQuestions() {
    return this.questionService.getAllQuestions().subscribe((questions) => {
      this.questions = questions;
      this.selectedQuestions = questions.filter(q => this.quiz.questions.findIndex(x => x.id === q.id) != -1);
    });
  }

  isSelected(question: Question) {
    return this.selectedQuestions.indexOf(question) !== -1;
  }
  
  previousPage() {
    this.currentPage--;
  }
  nextPage() {
    this.currentPage++;
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      title: [''],
      typeId: [''],
      textBelow: [''],
      tags: [''],
      answers: this.formBuilder.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      text: [''],
      isCorrect: [false]
    });
  }


  getAllLanguages() {
    this.languageService.getAllLanguages()
      .subscribe((languages) => {
        this.languages = languages;
        this.dupQuizForm.patchValue({ languageId: this.quiz.language.id });
      });
  }

  getAllTypes() {
    this.quizTypeService.getAllTypes()
      .subscribe((quizTypes) => {
        this.quizTypes = quizTypes;
        this.dupQuizForm.patchValue({ typeId: this.quiz.type.id });
      });
  }

  dupQuiz() {
    const newGuid = uuidv4();
    const lastUpdate = moment().format("DD/MM/YYYY HH:mm:ss");
    this.quiz.id = newGuid;
    this.quiz.lastUpdate = lastUpdate;
    const quizData = this.dupQuizForm.value;
    quizData.questions = this.selectedQuestions;
    this.quizService.addQuiz(quizData)
      .subscribe(() => { },
        (error) => {
          if (error.status === 200) {
            this.dupQuizForm.reset();
            localStorage.removeItem("quiz");
            this.router.navigate(['quiz']);
          }
          this.errorMessage = error.error;
        });
  }

  updateSelectedQuestions(question: Question, event: any) {
    if (event.target.checked) {
      this.selectedQuestions.push(question);
    } else {
      const index = this.selectedQuestions.indexOf(question);
      this.selectedQuestions.splice(index, 1);
    }
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
}
