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
import { AuthService } from '../../_service/authenticationService/auth.service';
import { FormValidationServiceService } from '../../_service/formValidation/form-validation-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formdata: FormGroup;
  submit = false;
  validationErrorMessage = '';
  constructor(
    private auth: AuthService,
    private validationService: FormValidationServiceService
  ) {
    this.formdata = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  errorMessage = '';
  loading = false;
  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit() {
    this.loading = true;
    // call register service

    const name = this.formdata.get('name')?.value;
    const email = this.formdata.get('email')?.value;
    const password = this.formdata.get('password')?.value;

    this.auth
      .register(name, email, password)
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
  getErrorMessage(control: string) {
    return this.validationService.getErrorMessage(control, this);
  }
}
