import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formdata: FormGroup;
  constructor(private auth: AuthService) {
    this.formdata = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit = false;
  loading = false;
  errorMessage = '';
  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit() {
    this.loading = true;
    // console.log(this.formdata);
    // call login service
    const email = this.formdata.get('email')?.value;
    const password = this.formdata.get('password')?.value;
    this.auth
      .login(email, password)
      .subscribe({
        next: (data) => {
          this.auth.storeToken(data.idToken);
          // console.log(data.idToken);
          this.auth.canAuthenticate();
        },
        error: (data) => {
          // console.log(data.error);
          if (data.error.error.message == 'INVALID_LOGIN_CREDENTIALS') {
            this.errorMessage = 'Invalid credentails';
          } else {
            this.errorMessage = 'Unknown error when logging into this account';
          }
        },
      })
      .add(() => {
        this.loading = false;
        // console.log('login successful');
      });
  }
}
