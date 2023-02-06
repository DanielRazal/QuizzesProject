import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { QuestionTypeService } from 'src/app/services/question-type.service';
import { QuestionType } from 'src/app/models/questionType';

@Component({
  selector: 'app-duplicate',
  templateUrl: './duplicate.component.html',
  styleUrls: ['./duplicate.component.css']
})
export class DuplicateComponent implements OnInit {

  dupQuestionForm: FormGroup = new FormGroup({});
  question!: Question;
  types: QuestionType[] = [];
  errorMessage: string = "";
  totalPages = 2;
  currentPage = 1;

  constructor(private questionService: QuestionService, private router: Router
    , private formBuilder: FormBuilder, private questionTypeService: QuestionTypeService) { }

  ngOnInit(): void {
    this.question = JSON.parse(localStorage.getItem("question")!);

    this.dupQuestionForm = this.formBuilder.group({
      title: [''],
      typeId: [''],
      textBelow: [''],
      tags: [''],
      answers: this.formBuilder.array([])
    });
    this.question.answers.forEach(answer => {
      let answersFormArray = this.dupQuestionForm.get('answers') as FormArray;
      answersFormArray.push(this.formBuilder.group({
        text: [answer.text],
        isCorrect: [answer.isCorrect]
      }));
    });
    this.getAllTypes();
  }

  getAllTypes() {
    this.questionTypeService.getAllTypes()
      .subscribe((types) => {
        this.types = types;
        this.dupQuestionForm.patchValue({ typeId: this.question.type.id });
      });
  }

  dupQuestion() {
    const newGuid = uuidv4();
    this.question.id = newGuid;
    const lastUpdate = moment().format("DD/MM/YYYY HH:mm:ss");
    this.question.lastUpdate = lastUpdate;
    this.questionService.addQuestion(this.dupQuestionForm.value)
      .subscribe(() => {
      }, (error) => {
        if (error.status === 200) {
          this.dupQuestionForm.reset();
          localStorage.removeItem("question");
          this.router.navigate(['question'])
        }
        this.errorMessage = error.error;
      });
  }

  onInput(event: any) {
    this.dupQuestionForm.patchValue({ tags: event.target.value.split(',') });
  }

  getAnswers() {
    let answersFormArray = this.dupQuestionForm.get('answers') as FormArray;
    let answers = answersFormArray.controls;
    return answers;
  }

  previousPage() {
    this.currentPage--;
  }
  nextPage() {
    this.currentPage++;
  }
}
