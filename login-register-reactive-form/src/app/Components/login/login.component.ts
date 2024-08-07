import { Component, OnInit, inject } from '@angular/core';
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
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formdata: FormGroup;
  user: UserData = { userId: '', todos: [] };
  dataService: DataService = inject(DataService);
  constructor(
    private auth: AuthService,
    private validationService: FormValidationServiceService // private dataService: DataService
  ) {
    console.log('login instance created');
    this.formdata = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        validationService.customEmailValidator(),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit = false;
  loading = false;
  errorMessage = '';
  ngOnInit(): void {
    console.log('LoginComponent ngOnInit called');
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
          this.auth.detail().subscribe({
            next: (val) => {
              console.log('login' + val.users[0].localId);
              // this.dataService.raiseUserIdEmitter(val.users[0].localId);
              // this.dataService.onrainseevent(val.users[0].localId);
              this.dataService.setUserId(val.users[0].localId);
            },
          });
        },
        error: (data) => {
          // console.log(data.error);
          if (data.error.error.message == 'INVALID_LOGIN_CREDENTIALS') {
            this.errorMessage = 'Invalid credentails';
          } else {
            this.errorMessage = 'Unknown error when logging into this account';
          }
        },
        // complete: () => {},
      })
      .add(() => {
        this.loading = false;
        // console.log('login successful');
      });
  }
  getErrorMessage(control: string) {
    return this.validationService.getErrorMessage(control, this);
  }
}
