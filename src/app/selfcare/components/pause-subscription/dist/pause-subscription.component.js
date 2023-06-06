"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PauseSubscriptionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var localstorage_slim_1 = require("localstorage-slim");
var moment = require("moment");
var PauseSubscriptionComponent = /** @class */ (function () {
    function PauseSubscriptionComponent(_squareService, _formBuilder, _router, _snackBar) {
        this._squareService = _squareService;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this._snackBar = _snackBar;
        this.ChangeTiming = ['IMMEDIATE', 'END_OF_BILLING_CYCLE'];
        this.pauseSubscriptionForm = this._formBuilder.group({
            //pause_cycle_duration: ['', Validators.required ],
            pause_effective_date: ['', forms_1.Validators.required],
            pause_reason: ['', forms_1.Validators.required],
            resume_change_timing: ['', forms_1.Validators.required],
            resume_effective_date: ['', forms_1.Validators.required]
        });
    }
    PauseSubscriptionComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localstorage_slim_1["default"].get('active_subscription_id', { decrypt: true })) {
            return;
        }
        else {
            this._snackBar.open('You have no Active Subscriptions. Subscribe to Continue..', 'Close');
            setTimeout(function () {
                _this._router.navigate(['/selfcare/']);
            });
        }
    };
    PauseSubscriptionComponent.prototype.onSubmit = function () {
        var _this = this;
        var formValues = this.pauseSubscriptionForm.value;
        var dataSet = {
            subscription_id: localstorage_slim_1["default"].get('active_subscription_id', { decrypt: true }),
            dataSet: {
                resume_change_timing: formValues.resume_change_timing,
                pause_reason: formValues.pause_reason,
                // pause_cycle_duration: formValues.pause_cycle_duration,
                pause_effective_date: this.formatDate(formValues.pause_effective_date),
                resume_effective_date: this.formatDate(formValues.resume_effective_date)
            }
        };
        this._squareService.pauseSubscription(dataSet).subscribe(function (result) {
            _this._snackBar.open('Subscription Paused...', 'Close');
            setTimeout(function () {
                _this._router.navigate(['/selfcare']);
            });
        });
    };
    PauseSubscriptionComponent.prototype.formatDate = function (date) {
        return moment(date).format('YYYY-MM-DD');
    };
    PauseSubscriptionComponent = __decorate([
        core_1.Component({
            selector: 'app-pause-subscription',
            templateUrl: './pause-subscription.component.html',
            styleUrls: ['./pause-subscription.component.scss']
        })
    ], PauseSubscriptionComponent);
    return PauseSubscriptionComponent;
}());
exports.PauseSubscriptionComponent = PauseSubscriptionComponent;
