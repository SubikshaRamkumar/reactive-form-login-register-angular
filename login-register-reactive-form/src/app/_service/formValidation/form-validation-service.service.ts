import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationServiceService {
  validationErrorMessage = '';
  getErrorMessage(controlName: string, component: any): string {
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
      }
    } else if (controlName === 'name') {
      if (control.errors?.['required']) {
        this.validationErrorMessage = 'Name is required';
      }
    }
    return this.validationErrorMessage;
  }
}
