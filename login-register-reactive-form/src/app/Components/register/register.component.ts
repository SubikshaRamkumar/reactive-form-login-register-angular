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
import { AuthService } from '../../service/authentication-service/auth.service';
import { FormValidationServiceService } from '../../service/form-validation/form-validation-service.service';
import { DataService } from '../../service/data.service';
import { UserData } from '../../models/users';

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
  user: UserData = { userId: '', todos: [] };
  constructor(
    private auth: AuthService,
    private validationService: FormValidationServiceService,
    private dataService: DataService
  ) {
    this.formdata = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        validationService.customEmailValidator(),
      ]),
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
        next: (data) => {
          this.auth.storeToken(data.idToken);
          this.auth.canAuthenticate();
          this.auth.detail().subscribe({
            next: (val) => {
              console.log('login' + val.users[0].localId);
              this.user.userId = val.users[0].localId;
              this.dataService.addToUsers(this.user);
              this.dataService.setUserId(val.users[0].localId);
            },
          });
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
        // complete: () => {},
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
