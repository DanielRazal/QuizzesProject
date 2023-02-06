import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionType } from 'src/app/models/questionType';
import { QuestionTypeService } from 'src/app/services/question-type.service';
import { QuestionService } from 'src/app/services/question.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  addQuestionForm: FormGroup = new FormGroup({});
  types: QuestionType[] = [];
  errorMessage: string = "";
  totalPages = 2;
  currentPage = 1;


  constructor(private questionService: QuestionService, private router: Router,
    private formBuilder: FormBuilder, private questionTypeService: QuestionTypeService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.addQuestionForm = this.formBuilder.group({
      title: [''],
      typeId: [''],
      textBelow: [''],
      tags: [''],
      answers: this.formBuilder.array([this.createAnswer()])
    });
    this.GetAllTypes();
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      isCorrect: [false]
    });
  }

  previousPage() {
    this.currentPage--;
  }
  nextPage() {
    this.currentPage++;
  }

  addQuestion() {
    this.questionService.addQuestion(this.addQuestionForm.value)
      .subscribe(() => { },
        (error) => {
          if (error.status === 200) {
            this.addQuestionForm.reset();
            this.router.navigate(['question']);
          }
          this.errorMessage = error.error;
        });
  }

  GetAllTypes() {
    this.questionTypeService.getAllTypes()
      .subscribe((types) => {
        this.types = types;
      });
  }

  addAnswer() {
    let answersFormArray = this.addQuestionForm.get('answers') as FormArray;
    let textControl = answersFormArray.at(answersFormArray.length - 1).get('text');
    if (textControl!.invalid) {
      this.swalService.messageToUser("Before you click add, fill in the answer field");
      return;
    } else {
      answersFormArray.push(this.createAnswer());
    }
  }

  getAnswers() {
    let answersFormArray = this.addQuestionForm.get('answers') as FormArray;
    let answers = answersFormArray.controls;
    return answers;
  }

  onInput(event: any) {
    this.addQuestionForm.patchValue({ tags: event.target.value.split(',') });
  }
}
