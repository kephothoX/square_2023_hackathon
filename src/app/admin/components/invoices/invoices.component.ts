import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SquareService } from '../../services/square.service'
import { Router } from '@angular/router';

import { Invoice } from '../../interfaces/invoice';
import { Location } from '../../interfaces/location';

import ls from 'localstorage-slim';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  locations: Location[]  = [];
  invoices: Invoice[] = [];

  displayedColumns: string[] = ['invoice_number', 'title', 'amount_paid', 'amount_due', 'due_date', 'recipient', 'status']

  constructor(
    private _squareService: SquareService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {
    ls.set('active_route', `${ this._router.routerState.snapshot.url }`, { encrypt: true} );
  }

  locationFormGroup = this._formBuilder.group({
    location: ['', Validators.required],
  });



  ngOnInit() {
    this._squareService.listLocations().subscribe((result: any) => {
     this.locations = result.locations;
   });
  }

  getInvoices(location: string | undefined) {
    if(Boolean(ls.get('auth_login_status', { decrypt: true })) == true) {
      this._squareService.getInvoices({ id: location }).subscribe((result: any) => {
        this.invoices = result.invoices;

        console.log(result);
      });

    } else {
      this._router.navigate(['/selfcare/auth/login']);
    }
  }

}
