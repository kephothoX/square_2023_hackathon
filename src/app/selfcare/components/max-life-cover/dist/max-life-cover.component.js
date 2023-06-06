"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaxLifeCoverComponent = void 0;
var core_1 = require("@angular/core");
var localstorage_slim_1 = require("localstorage-slim");
var MaxLifeCoverComponent = /** @class */ (function () {
    function MaxLifeCoverComponent(_selfcareService, _squareService, _appService, _router, _snackBar) {
        this._selfcareService = _selfcareService;
        this._squareService = _squareService;
        this._appService = _appService;
        this._router = _router;
        this._snackBar = _snackBar;
        this.isLoggedIn = localstorage_slim_1["default"].get('auth_signin_status', { decrypt: true }) ? true : false;
        localstorage_slim_1["default"].set('active_route', "" + this._router.routerState.snapshot.url, { encrypt: true });
    }
    MaxLifeCoverComponent.prototype.ngOnInit = function () {
        this.getWeeklyMLCSubscriptionAmount();
        this.getMonthlylyMLCSubscriptionAmount();
        this.getAnnualMLCSubscriptionAmount();
    };
    MaxLifeCoverComponent.prototype.getWeeklyMLCSubscriptionAmount = function () {
        var _this = this;
        this._squareService.getCatalogWithID({ id: 'ITAJTCSYUMP2NBBAOZWEISRR' }).subscribe(function (result) {
            _this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;
        });
    };
    MaxLifeCoverComponent.prototype.getMonthlylyMLCSubscriptionAmount = function () {
        var _this = this;
        this._squareService.getCatalogWithID({ id: 'GYW4I57XBBTNM5FSV5JCJEH5' }).subscribe(function (result) {
            _this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;
        });
    };
    MaxLifeCoverComponent.prototype.getAnnualMLCSubscriptionAmount = function () {
        var _this = this;
        this._squareService.getCatalogWithID({ id: 'OI3G6ID2GWQ2RF6OBMMH6QU2' }).subscribe(function (result) {
            _this.annualAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;
        });
    };
    MaxLifeCoverComponent.prototype.subscribeWeekly = function () {
        var _this = this;
        if (localstorage_slim_1["default"].get('active_subscription_id')) {
            this._snackBar.open('Already Have An Active Subscription.', 'Close');
            setTimeout(function () {
                _this._router.navigate(['/selfcare/subscriptions/my-invoices']);
            });
        }
        else {
            this._appService.listMerchants().subscribe(function (result) {
                var dataSet = {
                    "idempotency_key": self.crypto.randomUUID(),
                    "location_id": result.merchant[0].main_location_id,
                    "plan_id": "ITAJTCSYUMP2NBBAOZWEISRR",
                    "customer_id": localstorage_slim_1["default"].get('customer_id', { decrypt: true })
                };
                _this._squareService.newSubscriptionPlan(dataSet).subscribe(function (res) {
                    _this._snackBar.open('Subscription Successfull.', 'Close');
                    setTimeout(function () {
                        _this._router.navigate(['/selfcare/subscriptions/my-invoices']);
                    }, 1000);
                });
            });
        }
    };
    MaxLifeCoverComponent.prototype.subscribeMonthly = function () {
        var _this = this;
        if (localstorage_slim_1["default"].get('active_subscription_id')) {
            this._snackBar.open('Already Have An Active Subscription.', 'Close');
            setTimeout(function () {
                _this._router.navigate(['/selfcare/subscriptions/my-invoices']);
            });
        }
        else {
            this._appService.listMerchants().subscribe(function (result) {
                var dataSet = {
                    "idempotency_key": self.crypto.randomUUID(),
                    "location_id": result.merchant[0].main_location_id,
                    "plan_id": "GYW4I57XBBTNM5FSV5JCJEH5",
                    "customer_id": localstorage_slim_1["default"].get('customer_id', { decrypt: true })
                };
                _this._squareService.newSubscriptionPlan(dataSet).subscribe(function (res) {
                    _this._snackBar.open('Subscription Successfull.', 'Close');
                    setTimeout(function () {
                        _this._router.navigate(['/selfcare/subscriptions/my-invoices']);
                    }, 1000);
                });
            });
        }
    };
    MaxLifeCoverComponent.prototype.subscribeAnnually = function () {
        var _this = this;
        if (localstorage_slim_1["default"].get('active_subscription_id')) {
            this._snackBar.open('Already Have An Active Subscription.', 'Close');
            setTimeout(function () {
                _this._router.navigate(['/selfcare/subscriptions/my-invoices']);
            });
        }
        else {
            this._appService.listMerchants().subscribe(function (result) {
                var dataSet = {
                    "idempotency_key": self.crypto.randomUUID(),
                    "location_id": result.merchant[0].main_location_id,
                    "plan_id": "OI3G6ID2GWQ2RF6OBMMH6QU2",
                    "customer_id": localstorage_slim_1["default"].get('customer_id', { decrypt: true })
                };
                _this._squareService.newSubscriptionPlan(dataSet).subscribe(function (res) {
                    _this._snackBar.open('Subscription Successfull.', 'Close');
                    setTimeout(function () {
                        _this._router.navigate(['/selfcare/subscriptions/my-invoices']);
                    }, 1000);
                });
            });
        }
    };
    MaxLifeCoverComponent = __decorate([
        core_1.Component({
            selector: 'app-max-life-cover',
            templateUrl: './max-life-cover.component.html',
            styleUrls: ['./max-life-cover.component.scss']
        })
    ], MaxLifeCoverComponent);
    return MaxLifeCoverComponent;
}());
exports.MaxLifeCoverComponent = MaxLifeCoverComponent;
