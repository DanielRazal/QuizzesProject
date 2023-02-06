import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { adminLoginEnvironment, serverEnvironment } from 'src/environments/environment';
import { Admin } from '../models/admin';
import { AdminLogin } from '../models/adminLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = serverEnvironment.baseUrl;
  private api = adminLoginEnvironment.api;
  private routeLogin = adminLoginEnvironment.routeLogin;

  constructor(private http: HttpClient) { }

  login(user: AdminLogin): Observable<AdminLogin> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<AdminLogin>(this.baseUrl + this.api + this.routeLogin, user, httpOptions);
  }

  getUserById(id: string): Observable<Admin> {
    return this.http.get<Admin>(this.baseUrl + this.api + '/' + id)
  }
}
