import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionType } from 'src/app/models/questionType';
import { QuestionTypeService } from 'src/app/services/question-type.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  editQuestionForm: FormGroup = new FormGroup({});
  question!: Question;
  types: QuestionType[] = [];
  errorMessage: string = "";
  totalPages = 2;
  currentPage = 1;

  constructor(private questionService: QuestionService, private router: Router
    , private formBuilder: FormBuilder, private questionTypeService: QuestionTypeService) { }

  ngOnInit(): void {
    this.question = JSON.parse(localStorage.getItem("question")!);

    this.editQuestionForm = this.formBuilder.group({
      title: [''],
      typeId: [''],
      textBelow: [''],
      tags: [''],
      answers: this.formBuilder.array([])
    });

    this.question.answers.forEach(answer => {
      let answersFormArray = this.editQuestionForm.get('answers') as FormArray;
      answersFormArray.push(this.formBuilder.group({
        text: [answer.text],
        isCorrect: [answer.isCorrect]
      }));
    });

    this.getAllTypes();
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.question.id, this.editQuestionForm.value)
      .subscribe(() => {
      }, (error) => {
        if (error.status === 200) {
          this.editQuestionForm.reset();
          localStorage.removeItem("question");
          this.router.navigate(['question'])
        }
        this.errorMessage = error.error;
      });
  }

  getAllTypes() {
    this.questionTypeService.getAllTypes()
      .subscribe((types) => {
        this.types = types;
        this.editQuestionForm.patchValue({ typeId: this.question.type.id });
      });
  }

  getAnswers() {
    let answersFormArray = this.editQuestionForm.get('answers') as FormArray;
    let answers = answersFormArray.controls;
    return answers;
  }

  onInput(event: any) {
    this.editQuestionForm.patchValue({ tags: event.target.value.split(',') });
  }

  previousPage() {
    this.currentPage--;
  }
  nextPage() {
    this.currentPage++;
  }
}
