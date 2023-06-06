"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoicesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var localstorage_slim_1 = require("localstorage-slim");
var InvoicesComponent = /** @class */ (function () {
    function InvoicesComponent(_squareService, _formBuilder, _router) {
        this._squareService = _squareService;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this.locations = [];
        this.invoices = [];
        this.displayedColumns = ['invoice_number', 'title', 'amount_paid', 'amount_due', 'due_date', 'recipient', 'status'];
        this.locationFormGroup = this._formBuilder.group({
            location: ['', forms_1.Validators.required]
        });
        localstorage_slim_1["default"].set('active_route', "" + this._router.routerState.snapshot.url, { encrypt: true });
    }
    InvoicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._squareService.listLocations().subscribe(function (result) {
            _this.locations = result.locations;
        });
    };
    InvoicesComponent.prototype.getInvoices = function (location) {
        var _this = this;
        if (Boolean(localstorage_slim_1["default"].get('auth_login_status', { decrypt: true })) == true) {
            this._squareService.getInvoices({ id: location }).subscribe(function (result) {
                _this.invoices = result.invoices;
                console.log(result);
            });
        }
        else {
            this._router.navigate(['/selfcare/auth/login']);
        }
    };
    InvoicesComponent = __decorate([
        core_1.Component({
            selector: 'app-invoices',
            templateUrl: './invoices.component.html',
            styleUrls: ['./invoices.component.scss']
        })
    ], InvoicesComponent);
    return InvoicesComponent;
}());
exports.InvoicesComponent = InvoicesComponent;
