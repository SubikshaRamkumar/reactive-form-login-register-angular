import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formdata = { email: '', password: '' };
  submit = false;
  loading = false;
  errorMessage = '';
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit() {
    this.loading = true;
    // console.log(this.formdata);
    // call login service
    this.auth
      .login(this.formdata.email, this.formdata.password)
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
