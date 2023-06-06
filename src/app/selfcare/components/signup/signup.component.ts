import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';
import { SquareService } from '../../services/square.service';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces/country';

import { Payment } from '../../interfaces/payment';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';
  Countries?: Country[];
  Phone_Prefix?: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _router: Router,
    private _squareService: SquareService,
    public _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result;
    });
  }

  newSqUserForm = this._formBuilder.group({
    given_name: ['', Validators.required],
    family_name: ['', Validators.required],
    email_address: ['', Validators.required],
    phone_number: ['', Validators.required],
    company_name: ['', Validators.required],

    address: this._formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      locality: ['', Validators.required],
      administrative_district_level_1: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required]
    }),
  });


  newUserCredentialsForm =   this._formBuilder.group({
      email_address: ['', Validators.required],
      password: ['', Validators.required],
  })

  getEmailAddress(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    this.email_address = email;
  }

  getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }

  addBillingInformation = this._formBuilder.group({

  });

  onSubmitSquareUser() {
    const newUserFormValues = this.newSqUserForm.value;

    const sQUserDataSet = {
      idempotency_key: self.crypto.randomUUID(),
      given_name: newUserFormValues.given_name,
      family_name: newUserFormValues.family_name,
      email_address: newUserFormValues.email_address,
      phone_number: `${ this.Phone_Prefix }${ newUserFormValues.phone_number }`,
      company_name: newUserFormValues.company_name,

      address: {
        address_line_1: newUserFormValues.address?.address_line_1,
        address_line_2: newUserFormValues.address?.address_line_2,
        locality: newUserFormValues.address?.locality,
        administrative_district_level_1: newUserFormValues.address?.administrative_district_level_1,
        postal_code: newUserFormValues.address?.postal_code,
        country: newUserFormValues.address?.country
      },
    };

    const verificationDetails = {
        amount: '1.00',
        billingContact: {
          addressLines: [ newUserFormValues.address?.address_line_1, newUserFormValues.address?.address_line_2],
          familyName: newUserFormValues.family_name,
          givenName: newUserFormValues.given_name,
          email: newUserFormValues.email_address,
          country: newUserFormValues.address?.country,
          phone: `${ this.Phone_Prefix }${ newUserFormValues.phone_number }`,
          region: newUserFormValues.address?.country,
          city:  newUserFormValues.address?.locality,
        },
        currencyCode: 'USD',
        intent: 'CHARGE',
      };

      //window.sessionStorage.setItem('verificationDetails', JSON.stringify(verificationDetails));


    this._authService.newSquareCustomer(sQUserDataSet).subscribe((result: any) => {
      this._snackBar.open(JSON.stringify('Square User Created Successfully'), 'Close');

    });
  }



  onSubmitUserCredentials() {

    const newUserCredsFormValues = this.newUserCredentialsForm.value;

    const userCredsDataSet  = {
      email_address: newUserCredsFormValues.email_address,
      password: newUserCredsFormValues.password,
    };


    this._authService.saveUserCredentials(userCredsDataSet);

    setTimeout(() => {
      this._snackBar.open(JSON.stringify('User Credentials created Successfully'), 'Close');
      this._router.navigate(['/selfcare/auth/signin']);
    }, 1000);


  }

  createPayment() {
    const payment: Payment = {
      location_id: ls.get('main_loc', { decrypt: true }),
      source_id: window.sessionStorage.getItem('token'),
      verification_token: window.sessionStorage.getItem('verificationToken'),
      idempotency_key: window.crypto.randomUUID(),
      autocomplete: true,
      note: "Customer Card Verification",
      customer_id: "W92WH6P11H4Z77CTET0RNTGFW8",
      amount_money: {
        amount: 1,
        currency: "USD"
      },
    };
    this._squareService.newPayment(payment).subscribe((result: any) => {
      console.log(result);
    });
  }


  getPayment() {
    this.disable_next = false;
  }


}
