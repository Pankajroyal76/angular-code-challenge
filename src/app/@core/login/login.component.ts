import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = environment.email;
  password = environment.password;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    let isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      this.router.navigateByUrl('dashboard');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get validationError() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if (
      this.loginForm.value.email === this.email &&
      this.loginForm.value.password === this.password
    ) {
      localStorage.setItem('isLogin', 'true');
      this.router.navigateByUrl('dashboard');
      this.toastr.success('Welcome To Dashboard');
    } else {
      this.toastr.error('Invalid User');
    }
  }
}
