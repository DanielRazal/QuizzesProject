import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { StudentService } from 'src/app/services/student.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit ,OnDestroy{
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = "";
  quizId: string = "";
  studentLogin: boolean = false;
  quiz!: Quiz;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private studentService: StudentService, private swalService: SwalService) { }

  ngOnDestroy(): void {
    localStorage.removeItem("quizIdStudentPage");
  }

  ngOnInit(): void {
    this.quizId = JSON.parse(localStorage.getItem("quizIdStudentPage")!);
    // console.log(this.quizId)

    this.loginForm = this.formBuilder.group({
      email: [''],
      fullName: [''],
    });
  }

  login() {
    this.studentService.login(this.loginForm.value)
      .subscribe((student) => {
        this.loginForm.reset();
        if (this.quizId && student.id) {
          this.swalService.success("Connects to the quiz")
          localStorage.setItem("quizIdStructure", JSON.stringify(this.quizId));
          localStorage.setItem("studentIdQuizStructure", JSON.stringify(student.id));
          this.router.navigate(['quizStructure']);
        }
      }, (error) => {
        console.error(error);
        this.errorMessage = error.error;
      });
  }
}
