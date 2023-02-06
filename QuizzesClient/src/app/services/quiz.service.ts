import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quizEnvironment, serverEnvironment } from 'src/environments/environment';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  private baseUrl = serverEnvironment.baseUrl;
  private api = quizEnvironment.api;

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl + this.api);
  }

  deleteQuiz(id: string): Observable<Quiz> {
    return this.http.delete<Quiz>(this.baseUrl + this.api + '/' + id)
  }

  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(this.baseUrl + this.api + '/' + id)
  }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Quiz>(this.baseUrl + this.api, quiz, httpOptions);
  }

  updateQuiz(id: string, quiz: Quiz): Observable<Quiz> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Quiz>(this.baseUrl + this.api + '/' + id, quiz, httpOptions)
  }
}
