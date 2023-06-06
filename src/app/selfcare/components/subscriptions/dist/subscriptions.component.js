"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriptionsComponent = void 0;
var core_1 = require("@angular/core");
var localstorage_slim_1 = require("localstorage-slim");
var SubscriptionsComponent = /** @class */ (function () {
    function SubscriptionsComponent(_squareService, _router, _snackBar) {
        this._squareService = _squareService;
        this._router = _router;
        this._snackBar = _snackBar;
        this.invoices = [];
        this.displayedColumns = ['invoice_number', 'title', 'created_at', 'subscription_amount', 'amount_paid', 'due_date', 'status', 'public_url'];
        localstorage_slim_1["default"].set('active_route', "" + this._router.routerState.snapshot.url, { encrypt: true });
    }
    SubscriptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (Boolean(localstorage_slim_1["default"].get('auth_login_status', { decrypt: true })) == true) {
            var qs_1 = {
                "query": {
                    "filter": {
                        "customer_ids": [
                            "" + localstorage_slim_1["default"].get('customer_id', { decrypt: true })
                        ],
                        "location_ids": [
                            "" + localstorage_slim_1["default"].get('main_loc', { decrypt: true })
                        ]
                    }
                }
            };
            this._squareService.getSubscriptions(qs_1).subscribe(function (result) {
                _this.invoices = result.invoices;
                localstorage_slim_1["default"].set('active_subscription_id', "" + result.invoices[0].subscription_id, { encrypt: true });
            });
        }
        else {
            this._router.navigate(['/selfcare/auth/login']);
        }
    };
    SubscriptionsComponent = __decorate([
        core_1.Component({
            selector: 'app-subscriptions',
            templateUrl: './subscriptions.component.html',
            styleUrls: ['./subscriptions.component.scss']
        })
    ], SubscriptionsComponent);
    return SubscriptionsComponent;
}());
exports.SubscriptionsComponent = SubscriptionsComponent;
