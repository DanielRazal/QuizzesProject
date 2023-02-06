import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { questionEnvironment, serverEnvironment } from 'src/environments/environment';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = serverEnvironment.baseUrl;
  private api = questionEnvironment.api;

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl + this.api);
  }

  deleteQuestion(id: string): Observable<Question> {
    return this.http.delete<Question>(this.baseUrl + this.api + '/' + id)
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(this.baseUrl + this.api + '/' + id)
  }

  addQuestion(question: Question): Observable<Question> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Question>(this.baseUrl + this.api, question, httpOptions);
  }

  updateQuestion(id: string, question: Question): Observable<Question> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.put<Question>(this.baseUrl + this.api + '/' + id, question, httpOptions)
  }
}
