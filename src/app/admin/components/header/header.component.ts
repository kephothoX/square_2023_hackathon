import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title?: string;

  accountEmail = ls.get('customer_email_address', { decrypt: true });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {  }

  ngOnInit() {
    this.title = this._activatedRoute.snapshot.routeConfig?.title?.toString();

  }

  logOut() {
    ls.remove('auth_login_status');
    ls.remove('customer_id');
    ls.remove('customer_email_address');
    ls.remove('active_route');
    ls.remove('active_subscription_id');

    setTimeout(() => {
      this._router.navigate(['/selfcare/auth/signin']);
    });


  }

}
