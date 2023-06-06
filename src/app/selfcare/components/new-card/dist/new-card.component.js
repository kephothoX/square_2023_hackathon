"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewCardComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var localstorage_slim_1 = require("localstorage-slim");
var NewCardComponent = /** @class */ (function () {
    function NewCardComponent(_formBuilder, _authService, _appService, _squareService, _router, _snackBar) {
        this._formBuilder = _formBuilder;
        this._authService = _authService;
        this._appService = _appService;
        this._squareService = _squareService;
        this._router = _router;
        this._snackBar = _snackBar;
        this.newCardForm = this._formBuilder.group({
            cardholder_name: ['', forms_1.Validators.required],
            billingAddress: this._formBuilder.group({
                address_line_1: ['', forms_1.Validators.required],
                address_line_2: ['', forms_1.Validators.required],
                locality: ['', forms_1.Validators.required],
                administrative_district_level_1: ['', forms_1.Validators.required],
                postal_code: ['', forms_1.Validators.required],
                country: ['', forms_1.Validators.required]
            }),
            first_name: ['', forms_1.Validators.required],
            last_name: ['', forms_1.Validators.required],
            exp_month: ['', forms_1.Validators.required],
            exp_year: ['', forms_1.Validators.required]
        });
    }
    NewCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authService.getuserByEmailAddress("" + localstorage_slim_1["default"].get('customer_email_address', { decrypt: true })).subscribe(function (result) {
            console.log(result);
            _this.userData = result.customers[0];
        });
        this._appService.getCountryCodes().subscribe(function (result) {
            _this.Countries = result;
        });
    };
    NewCardComponent.prototype.onSubmit = function () {
        var _a, _b, _c, _d, _e, _f;
        var formValues = this.newCardForm.value;
        var dataSet = {
            source_id: "cnon:card-nonce-ok",
            idempotency_key: self.crypto.randomUUID(),
            card: {
                cardholder_name: formValues.cardholder_name,
                billing_address: {
                    address_line_1: (_a = formValues.billingAddress) === null || _a === void 0 ? void 0 : _a.address_line_1,
                    address_line_2: (_b = formValues.billingAddress) === null || _b === void 0 ? void 0 : _b.address_line_2,
                    locality: (_c = formValues.billingAddress) === null || _c === void 0 ? void 0 : _c.locality,
                    administrative_district_level_1: (_d = formValues.billingAddress) === null || _d === void 0 ? void 0 : _d.administrative_district_level_1,
                    postal_code: (_e = formValues.billingAddress) === null || _e === void 0 ? void 0 : _e.postal_code,
                    country: (_f = formValues.billingAddress) === null || _f === void 0 ? void 0 : _f.country,
                    first_name: formValues.first_name,
                    last_name: formValues.last_name
                },
                customer_id: this.userData.id,
                exp_month: formValues.exp_month,
                exp_year: formValues.exp_year
            }
        };
        console.log(dataSet);
        this._squareService.addNewCard(dataSet).subscribe(function (result) {
            console.log(result);
        });
    };
    NewCardComponent = __decorate([
        core_1.Component({
            selector: 'app-new-card',
            templateUrl: './new-card.component.html',
            styleUrls: ['./new-card.component.scss']
        })
    ], NewCardComponent);
    return NewCardComponent;
}());
exports.NewCardComponent = NewCardComponent;
