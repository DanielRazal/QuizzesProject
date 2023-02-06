import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { languageEnvironment, serverEnvironment } from 'src/environments/environment';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private baseUrl = serverEnvironment.baseUrl;
  private api = languageEnvironment.api;

  constructor(private http: HttpClient) { }

  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.baseUrl + this.api);
  }
}
