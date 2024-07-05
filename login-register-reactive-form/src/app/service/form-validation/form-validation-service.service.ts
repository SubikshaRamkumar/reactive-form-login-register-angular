import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class FormValidationServiceService {
  validationErrorMessage = '';
  getErrorMessage(
    controlName: string,
    component: RegisterComponent | LoginComponent
  ): string {
    const control = component.formdata.controls[controlName] as AbstractControl;

    if (controlName === 'password') {
      if (control.errors?.['required']) {
        this.validationErrorMessage = 'password is required';
      } else if (control.errors?.['minlength']) {
        this.validationErrorMessage =
          'MinLength of password must be 8 charcaters';
      }
    } else if (controlName === 'email') {
      if (control.errors?.['required']) {
        this.validationErrorMessage = 'Email is required';
      } else if (control.errors?.['email']) {
        this.validationErrorMessage = 'Please enter valid email';
      } else if (control.errors?.['customEmailError']) {
        this.validationErrorMessage =
          'Please enter email with domain gmail.com';
      }
    } else if (controlName === 'name') {
      if (control.errors?.['required']) {
        this.validationErrorMessage = 'Name is required';
      }
    }
    return this.validationErrorMessage;
  }
  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const domain = control.value.split('@')[1]; // from arrays ['subi','gmail.com']
      // control.value.errors = null
      if (domain !== 'gmail.com') {
        return { customEmailError: true };
      }
      return null;
    };
  }
}
