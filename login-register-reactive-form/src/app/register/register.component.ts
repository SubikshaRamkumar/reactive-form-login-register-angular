import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  submit = false;
  formdata = { name: '', email: '', password: '' };
  errorMessage = '';
  loading = false;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit() {
    // console.log(this.formdata);
    this.loading = true;
    // call register service

    // console.log(
    //   this.auth.register(
    //     this.formdata.name,
    //     this.formdata.email,
    //     this.formdata.password
    //   )
    // );

    this.auth
      .register(this.formdata.name, this.formdata.email, this.formdata.password)
      .subscribe({
        // successful register - next function parameter . if not error function paramater
        next: (data) => {
          // store token after successful registration
          this.auth.storeToken(data.idToken);
          // console.log(data.idToken);
          this.auth.canAuthenticate();
        },
        error: (data) => {
          // console.log(data);
          if (data.error.error.message == 'INVALID_EMAIL') {
            this.errorMessage = 'Invalid email';
          } else if (data.error.error.message == 'EMAIL_EXISTS') {
            this.errorMessage = 'Already email exists';
          } else {
            this.errorMessage =
              'Unknown error occured when creating an account';
          }
        },
      })
      .add(() => {
        this.loading = false;
        // console.log('Register completed');
      });
  }
}
