import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverEnvironment, studentEnvironment } from 'src/environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = serverEnvironment.baseUrl;
  private api = studentEnvironment.api;
  private routeLogin = studentEnvironment.routeLogin;

  constructor(private http: HttpClient) { }

  login(student: Student): Observable<Student> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Student>(this.baseUrl + this.api + this.routeLogin, student, httpOptions);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + this.api + '/' + id)
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + this.api);
  }
}
