import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetailsQuizComponent } from './components/details-quiz/details-quiz.component';
import { DetailsStudentComponent } from './components/details-student/details-student.component';
import { DuplicateQuizComponent } from './components/duplicate-quiz/duplicate-quiz.component';
import { DuplicateComponent } from './components/duplicate/duplicate.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { AdminLoginComponent } from './components/adminLogin/adminLogin.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizStructureComponent } from './components/quiz-structure/quiz-structure.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ReportByQuizComponent } from './components/report-by-quiz/report-by-quiz.component';
import { ReportByStudentComponent } from './components/report-by-student/report-by-student.component';
import { ResultComponent } from './components/result/result.component';
import { StudentComponent } from './components/student/student.component';
import { ReviewAnswersComponent } from "./components/review-answers/review-answers.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login' , component:AdminLoginComponent},
  {path:'admin' , component:AdminComponent, canActivate:[AuthGuardAdmin]},
  {path:'question' , component:QuestionComponent, canActivate:[AuthGuardAdmin]},
  {path:'addQuestion' , component:AddQuestionComponent, canActivate:[AuthGuardAdmin]},
  {path:'editQuestion' , component:EditQuestionComponent, canActivate:[AuthGuardAdmin]},
  {path:'dupQuestion' , component:DuplicateComponent, canActivate:[AuthGuardAdmin]},
  {path:'student' , component:StudentComponent, canActivate:[AuthGuardAdmin]},
  {path:'quiz' , component:QuizComponent, canActivate:[AuthGuardAdmin]},
  {path:'addQuiz' , component:AddQuizComponent, canActivate:[AuthGuardAdmin]},
  {path:'editQuiz' , component:EditQuizComponent, canActivate:[AuthGuardAdmin]},
  {path:'dupQuiz' , component:DuplicateQuizComponent, canActivate:[AuthGuardAdmin]},
  { path: 'quizStructure', component: QuizStructureComponent , canActivate:[AuthGuardAdmin]},
  { path: 'result', component: ResultComponent , canActivate:[AuthGuardAdmin]},
  { path: 'reportByStudent', component: ReportByStudentComponent , canActivate:[AuthGuardAdmin]},
  { path: 'detailsStudent', component: DetailsStudentComponent , canActivate:[AuthGuardAdmin]},
  { path: 'reportByQuiz', component: ReportByQuizComponent , canActivate:[AuthGuardAdmin]},
  { path: 'detailsQuiz', component: DetailsQuizComponent , canActivate:[AuthGuardAdmin]},
  { path: 'reviewAnswers', component: ReviewAnswersComponent , canActivate:[AuthGuardAdmin]},
  {path:'**' , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
