"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewSubscriptionPlanComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewSubscriptionPlanComponent = /** @class */ (function () {
    function NewSubscriptionPlanComponent(_formBuilder, _currencyService, _squareService, _cadenceService, _snackBar) {
        this._formBuilder = _formBuilder;
        this._currencyService = _currencyService;
        this._squareService = _squareService;
        this._cadenceService = _cadenceService;
        this._snackBar = _snackBar;
        this.Currency = this._currencyService.Currency;
        this.Cadence = this._cadenceService.Cadence;
        this.newSubscriptionPlanForm = this._formBuilder.group({
            id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            cadence: ['', forms_1.Validators.required],
            currency: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            ordinal: ['', forms_1.Validators.required]
        });
    }
    NewSubscriptionPlanComponent.prototype.onSubmit = function () {
        var _this = this;
        var formValues = this.newSubscriptionPlanForm.value;
        var dataSet = {
            "idempotency_key": self.crypto.randomUUID(),
            "object": {
                "type": "SUBSCRIPTION_PLAN",
                "id": "# " + formValues.id,
                "subscription_plan_data": {
                    "name": formValues.name,
                    "phases": [
                        {
                            "cadence": formValues.cadence,
                            "recurring_price_money": {
                                "amount": formValues.amount,
                                "currency": formValues.currency
                            },
                            "ordinal": formValues.ordinal
                        }
                    ]
                }
            }
        };
        this._squareService.addNewCatalog(dataSet).subscribe(function (result) {
            _this._snackBar.open('New Subscruiption Plab Created Successfully', 'Close');
            setTimeout(function () {
                _this.resetForm();
            }, 1000);
        });
    };
    NewSubscriptionPlanComponent.prototype.resetForm = function () {
        this.newSubscriptionPlanForm.reset();
        window.location.reload();
    };
    NewSubscriptionPlanComponent = __decorate([
        core_1.Component({
            selector: 'app-new-subscription-plan',
            templateUrl: './new-subscription-plan.component.html',
            styleUrls: ['./new-subscription-plan.component.scss']
        })
    ], NewSubscriptionPlanComponent);
    return NewSubscriptionPlanComponent;
}());
exports.NewSubscriptionPlanComponent = NewSubscriptionPlanComponent;
