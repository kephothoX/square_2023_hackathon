"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditUserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(_formBuilder, _activatedRoute, _squareService, _snackBar, _router) {
        this._formBuilder = _formBuilder;
        this._activatedRoute = _activatedRoute;
        this._squareService = _squareService;
        this._snackBar = _snackBar;
        this._router = _router;
        this.editForm = this._formBuilder.group({
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
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._activatedRoute.snapshot.params['id'];
        this.user_id = id;
        this._squareService.getUser({ id: id }).subscribe(function (result) {
            _this.user = result.customer;
        });
    };
    EditUserComponent.prototype.onSubmit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        var formValues = this.editForm.value;
        var dataSet = {
            id: this.user_id,
            idempotency_key: self.crypto.randomUUID(),
            given_name: formValues.given_name,
            family_email: formValues.family_name,
            email_address: formValues.email_address,
            phone_number: formValues.phone_number,
            company_name: formValues.company_name,
            address: {
                address_line_1: (_a = formValues.address) === null || _a === void 0 ? void 0 : _a.address_line_1,
                address_line_2: (_b = formValues.address) === null || _b === void 0 ? void 0 : _b.address_line_2,
                locality: (_c = formValues.address) === null || _c === void 0 ? void 0 : _c.locality,
                administrative_district_level_1: (_d = formValues.address) === null || _d === void 0 ? void 0 : _d.administrative_district_level_1,
                postal_code: (_e = formValues.address) === null || _e === void 0 ? void 0 : _e.postal_code,
                country: (_f = formValues.address) === null || _f === void 0 ? void 0 : _f.country
            }
        };
        this._squareService.updateUser(dataSet).subscribe(function (result) {
            _this._snackBar.open('User Edited Successfully', 'Close');
            setTimeout(function () {
                _this._router.navigate(['/admin/users']);
            }, 1000);
        });
    };
    EditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.scss']
        })
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
