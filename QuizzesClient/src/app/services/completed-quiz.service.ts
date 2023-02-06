import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { completedQuizEnvironment, serverEnvironment } from 'src/environments/environment';
import { CompletedQuiz } from '../models/completedQuiz';

@Injectable({
  providedIn: 'root'
})
export class CompletedQuizService {

  private baseUrl = serverEnvironment.baseUrl;
  private api = completedQuizEnvironment.api;

  constructor(private http: HttpClient) { }

  addCompletedQuiz(completedQuiz: CompletedQuiz): Observable<CompletedQuiz> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<CompletedQuiz>(this.baseUrl + this.api, completedQuiz, httpOptions);
  }

  getAllCompletedQuizzesByStudent(studentId: string): Observable<CompletedQuiz[]> {
    return this.http.get<CompletedQuiz[]>(this.baseUrl + this.api + '/student/' + studentId);
  }

  getAllCompletedQuizzes(): Observable<CompletedQuiz[]> {
    return this.http.get<CompletedQuiz[]>(this.baseUrl + this.api);
  }

  getCompletedQuizById(id: string): Observable<CompletedQuiz> {
    return this.http.get<CompletedQuiz>(this.baseUrl + this.api + '/' + id)
  }
}
