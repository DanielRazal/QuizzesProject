import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { questionTypeEnvironment, serverEnvironment } from 'src/environments/environment';
import { QuestionType } from '../models/questionType';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  private baseUrl = serverEnvironment.baseUrl;
  private api = questionTypeEnvironment.api;

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>(this.baseUrl + this.api);
  }
}
