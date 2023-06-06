import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';
import { Catalog } from '../../interfaces/catalog';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  displayedColumns: string[] = ['id', 'version', 'name', 'cadence', 'amount'];
  subscriptions: Catalog[] = [];

  constructor(
    private _squareService: SquareService,
  ) {}


  ngOnInit() {
    const qs = {
    "query": {
      "filter": {
        "location_ids": [
          "L65G08M451324"
        ]
      }
    }
  }
    this._squareService.listCatalog().subscribe((result: any) => {
      this.subscriptions = result.objects;
      console.log(this.subscriptions);
      console.log(result);
    });
  }

}
