import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompletedQuiz } from 'src/app/models/completedQuiz';
import { Student } from 'src/app/models/student';
import { CompletedQuizService } from 'src/app/services/completed-quiz.service';
import { StudentService } from 'src/app/services/student.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-report-by-student',
  templateUrl: './report-by-student.component.html',
  styleUrls: ['./report-by-student.component.css']
})
export class ReportByStudentComponent implements OnInit {

  students: Student[] = [];
  searchText: any;
  student!: Student;
  title: string = "Student Report";
  completedQuiz: CompletedQuiz[] = [];

  constructor(private studentService: StudentService, private router: Router,
    private completedQuizService: CompletedQuizService,
    private swalService:SwalService) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllCompletedQuizzes();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students
    })
  }
  getAllCompletedQuizzes() {
    this.completedQuizService.getAllCompletedQuizzes().subscribe((completedQuiz) => {
      this.completedQuiz = completedQuiz;
    })
  }

  nav(student: Student, nav: string) {
    
    if (this.completedQuiz.find(x => x.student.id === student.id)) {
      localStorage.setItem("student", JSON.stringify(student));
      this.router.navigate([`${nav}`]);
    }
    else{
      this.swalService.messageToUser(`Student ${student.fullName} has no completed quizzes`);
      return;
    }
  }
}
