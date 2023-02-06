import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css']
})
export class AdminLoginComponent implements OnInit {

  errorMessage: string = "";
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService,private swalService:SwalService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    this.loginService.login(this.loginForm.value)
      .subscribe((res) => {
        this.loginForm.reset();
        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("admin", JSON.stringify(res.admin));
        this.swalService.success("Connects to the site")
        this.router.navigate(['admin']);
      }, (error) => {
        this.errorMessage = error.error;
      });
  }
}
