import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin!: Admin;
  title: string = "Welcome Admin";

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem("admin")!);
    this.loginService.getUserById(this.admin.id).subscribe((admin) => {
      this.admin = admin;
    })
  }
}
