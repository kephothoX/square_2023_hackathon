"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var localstorage_slim_1 = require("localstorage-slim");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(_formBuilder, _authService, _appService, _router, _squareService, _snackBar) {
        this._formBuilder = _formBuilder;
        this._authService = _authService;
        this._appService = _appService;
        this._router = _router;
        this._squareService = _squareService;
        this._snackBar = _snackBar;
        this.disable_next = true;
        this.duration = '2000';
        this.email_address = '';
        this.newSqUserForm = this._formBuilder.group({
            given_name: ['', forms_1.Validators.required],
            family_name: ['', forms_1.Validators.required],
            email_address: ['', forms_1.Validators.required],
            phone_number: ['', forms_1.Validators.required],
            company_name: ['', forms_1.Validators.required],
            address: this._formBuilder.group({
                address_line_1: ['', forms_1.Validators.required],
                address_line_2: ['', forms_1.Validators.required],
                locality: ['', forms_1.Validators.required],
                administrative_district_level_1: ['', forms_1.Validators.required],
                postal_code: ['', forms_1.Validators.required],
                country: ['', forms_1.Validators.required]
            })
        });
        this.newUserCredentialsForm = this._formBuilder.group({
            email_address: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.addBillingInformation = this._formBuilder.group({});
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._appService.getCountryCodes().subscribe(function (result) {
            _this.Countries = result;
        });
    };
    SignupComponent.prototype.getEmailAddress = function (event) {
        var email = event.target.value;
        this.email_address = email;
    };
    SignupComponent.prototype.getCountryPrefix = function (prefix) {
        this.Phone_Prefix = prefix;
    };
    SignupComponent.prototype.onSubmitSquareUser = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var newUserFormValues = this.newSqUserForm.value;
        var sQUserDataSet = {
            idempotency_key: self.crypto.randomUUID(),
            given_name: newUserFormValues.given_name,
            family_name: newUserFormValues.family_name,
            email_address: newUserFormValues.email_address,
            phone_number: "" + this.Phone_Prefix + newUserFormValues.phone_number,
            company_name: newUserFormValues.company_name,
            address: {
                address_line_1: (_a = newUserFormValues.address) === null || _a === void 0 ? void 0 : _a.address_line_1,
                address_line_2: (_b = newUserFormValues.address) === null || _b === void 0 ? void 0 : _b.address_line_2,
                locality: (_c = newUserFormValues.address) === null || _c === void 0 ? void 0 : _c.locality,
                administrative_district_level_1: (_d = newUserFormValues.address) === null || _d === void 0 ? void 0 : _d.administrative_district_level_1,
                postal_code: (_e = newUserFormValues.address) === null || _e === void 0 ? void 0 : _e.postal_code,
                country: (_f = newUserFormValues.address) === null || _f === void 0 ? void 0 : _f.country
            }
        };
        var verificationDetails = {
            amount: '1.00',
            billingContact: {
                addressLines: [(_g = newUserFormValues.address) === null || _g === void 0 ? void 0 : _g.address_line_1, (_h = newUserFormValues.address) === null || _h === void 0 ? void 0 : _h.address_line_2],
                familyName: newUserFormValues.family_name,
                givenName: newUserFormValues.given_name,
                email: newUserFormValues.email_address,
                country: (_j = newUserFormValues.address) === null || _j === void 0 ? void 0 : _j.country,
                phone: "" + this.Phone_Prefix + newUserFormValues.phone_number,
                region: (_k = newUserFormValues.address) === null || _k === void 0 ? void 0 : _k.country,
                city: (_l = newUserFormValues.address) === null || _l === void 0 ? void 0 : _l.locality
            },
            currencyCode: 'USD',
            intent: 'CHARGE'
        };
        //window.sessionStorage.setItem('verificationDetails', JSON.stringify(verificationDetails));
        this._authService.newSquareCustomer(sQUserDataSet).subscribe(function (result) {
            _this._snackBar.open(JSON.stringify('Square User Created Successfully'), 'Close');
        });
    };
    SignupComponent.prototype.onSubmitUserCredentials = function () {
        var _this = this;
        var newUserCredsFormValues = this.newUserCredentialsForm.value;
        var userCredsDataSet = {
            email_address: newUserCredsFormValues.email_address,
            password: newUserCredsFormValues.password
        };
        this._authService.saveUserCredentials(userCredsDataSet);
        setTimeout(function () {
            _this._snackBar.open(JSON.stringify('User Credentials created Successfully'), 'Close');
            _this._router.navigate(['/selfcare/auth/signin']);
        }, 1000);
    };
    SignupComponent.prototype.createPayment = function () {
        var payment = {
            location_id: localstorage_slim_1["default"].get('main_loc', { decrypt: true }),
            source_id: window.sessionStorage.getItem('token'),
            verification_token: window.sessionStorage.getItem('verificationToken'),
            idempotency_key: window.crypto.randomUUID(),
            autocomplete: true,
            note: "Customer Card Verification",
            customer_id: "W92WH6P11H4Z77CTET0RNTGFW8",
            amount_money: {
                amount: 1,
                currency: "USD"
            }
        };
        this._squareService.newPayment(payment).subscribe(function (result) {
            console.log(result);
        });
    };
    SignupComponent.prototype.getPayment = function () {
        this.disable_next = false;
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
