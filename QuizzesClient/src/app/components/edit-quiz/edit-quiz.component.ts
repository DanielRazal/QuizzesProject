import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from 'src/app/models/language';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuizType } from 'src/app/models/quizType';
import { LanguageService } from 'src/app/services/language.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizTypeService } from 'src/app/services/quiz-type.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})

export class EditQuizComponent implements OnInit {
  editQuizForm: FormGroup = new FormGroup({});
  quiz!: Quiz;
  languages: Language[] = [];
  questions: Question[] = [];
  quizTypes: QuizType[] = [];
  errorMessage: string = "";
  selectedQuestions: Question[] = [];
  totalPages = 3;
  currentPage = 1;

  constructor(private quizService: QuizService, private router: Router
    , private formBuilder: FormBuilder, private languageService: LanguageService
    , private quizTypeService: QuizTypeService, private questionService: QuestionService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.quiz = JSON.parse(localStorage.getItem("quiz")!);

    this.editQuizForm = this.formBuilder.group({
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
      this.selectedQuestions = questions.filter(q => this.quiz.questions.findIndex(x => x.id === q.id) != -1)
    });
  }

  isSelected(question: Question) {
    return this.selectedQuestions.indexOf(question) !== -1;
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

  updateQuiz() {
    const quizData = this.editQuizForm.value;
    quizData.questions = this.selectedQuestions;
    this.quizService.updateQuiz(this.quiz.id, quizData)
      .subscribe(() => {
        this.editQuizForm.reset();
        localStorage.removeItem("quiz");
        this.router.navigate(['quiz'])
      }, (error) => {
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

  previousPage() {
    this.currentPage--;
  }
  nextPage() {
    this.currentPage++;
  }

  getAllLanguages() {
    this.languageService.getAllLanguages()
      .subscribe((languages) => {
        this.languages = languages;
        this.editQuizForm.patchValue({ languageId: this.quiz.language.id });
      });
  }
  getAllTypes() {
    this.quizTypeService.getAllTypes()
      .subscribe((quizTypes) => {
        this.quizTypes = quizTypes;
        this.editQuizForm.patchValue({ typeId: this.quiz.type.id });
      });
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
