import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/auth.service'

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    public _snackBar: MatSnackBar,
  ) { }


  signInForm = this._formBuilder.group({
    email_address: ['', Validators.required],
    password: ['', Validators.required],
  });


  async onSubmit() {
    const email: string = this.signInForm.value.email_address ? this.signInForm.value.email_address: '';

    const dataSet = {
      email_address: this.signInForm.value.email_address,
      password: this.signInForm.value.password,
    }

    return this._authService.loginAdmin(dataSet)
    .then((res: any) => {
      this._snackBar.open(res, 'Close');
    });
  }

}
