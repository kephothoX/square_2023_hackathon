import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ls from 'localstorage-slim';

import { AuthService } from '../../../auth/auth.service'

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if(Boolean(ls.get('auth_login_status', { decrypt: true })) == true) {
      window.location.href = '/';
    } else {
      return;
    }

  }


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

    return this._authService.loginUser(dataSet)
    .then((res: any) => {
      this._snackBar.open(res, 'Close');

      setTimeout(() => {
        this._router.navigate(['/']);
      });

    });
  }

}
