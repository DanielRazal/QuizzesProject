import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/adminLogin/adminLogin.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionComponent } from './components/question/question.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DuplicateComponent } from './components/duplicate/duplicate.component';
import { StudentComponent } from './components/student/student.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { DuplicateQuizComponent } from './components/duplicate-quiz/duplicate-quiz.component';
import { QuizStructureComponent } from './components/quiz-structure/quiz-structure.component';
import { ResultComponent } from './components/result/result.component';
import { ReportByStudentComponent } from './components/report-by-student/report-by-student.component';
import { DetailsStudentComponent } from './components/details-student/details-student.component';
import { ReportByQuizComponent } from './components/report-by-quiz/report-by-quiz.component';
import { DetailsQuizComponent } from './components/details-quiz/details-quiz.component';
import { ReviewAnswersComponent } from "./components/review-answers/review-answers.component";
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminComponent,
    HeaderComponent,
    QuestionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    DuplicateComponent,
    StudentComponent,
    QuizComponent,
    AddQuizComponent,
    EditQuizComponent,
    DuplicateQuizComponent,
    QuizStructureComponent,
    ResultComponent,
    ReportByStudentComponent,
    DetailsStudentComponent,
    ReportByQuizComponent,
    DetailsQuizComponent,
    ReviewAnswersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
