import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quizTypeEnvironment, serverEnvironment } from 'src/environments/environment';
import { QuizType } from '../models/quizType';

@Injectable({
  providedIn: 'root'
})
export class QuizTypeService {
  private baseUrl = serverEnvironment.baseUrl;
  private api = quizTypeEnvironment.api;

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<QuizType[]> {
    return this.http.get<QuizType[]>(this.baseUrl + this.api);
  }
}
