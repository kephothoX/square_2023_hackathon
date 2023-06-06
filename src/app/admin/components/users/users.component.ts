import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';
import { Customer } from '../../interfaces/user';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Customer[] = [];

  displayedColumns: string[] = ['given_name', 'family_name', 'email_address', 'phone_number', 'company_name', 'id'];

  constructor(
    private _squareService: SquareService,
    public _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    (() => {
      this._squareService.getUsers().subscribe((results: any) => {
        this.users = results.customers;
        console.log(results);
      });
    })();
  }

  deleteUser(id: string) {
    this._squareService.deleteUser({ id: id }).subscribe((result: any) => {
      this._snackBar.open('User Deleted Successfully.', 'Close');
      window.location.reload();
    });
  }

}
