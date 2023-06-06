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
var moment = require("moment");
var localstorage_slim_1 = require("localstorage-slim");
var InvoicesComponent = /** @class */ (function () {
    function InvoicesComponent(_formBuilder, _squareService, _currencyService, _appService, _snackBar) {
        this._formBuilder = _formBuilder;
        this._squareService = _squareService;
        this._currencyService = _currencyService;
        this._appService = _appService;
        this._snackBar = _snackBar;
        this.duration = '2000';
        this.lineItemsCount = new Array('newlineItem');
        this.lineItems = new Array();
        this.locations = [];
        this.Currency = this._currencyService.Currency;
        this.InvoiceTypes = ['BALANCE', 'DEPOSIT', 'INSTALLMENT'];
        this.orderBackButton = false;
        this.invoiceBackButton = false;
        this.newOrderForm = this._formBuilder.group({
            name: ['', forms_1.Validators.required],
            quantity: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            currency: ['', forms_1.Validators.required],
            location: ['', forms_1.Validators.required]
        });
        this.newInvoiceForm = this._formBuilder.group({
            title: ['', forms_1.Validators.required],
            date: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            balance: [''],
            remarks: ['', forms_1.Validators.required],
            interval: ['', forms_1.Validators.required],
            due_date: ['', forms_1.Validators.required]
        });
    }
    InvoicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._squareService.listLocations().subscribe(function (result) {
            _this.locations = result.locations;
        });
    };
    InvoicesComponent.prototype.onSubmitOrder = function () {
        var _this = this;
        this.orderBackButton = true;
        this.lineItemsCount.pop();
        this.addNewLineItem();
        this._appService.listMerchants().subscribe(function (res) {
            var formValues = _this.newOrderForm.value;
            var dataSet = {
                "idempotency_key": self.crypto.randomUUID(),
                "order": {
                    "location_id": formValues.location,
                    "customer_id": localstorage_slim_1["default"].get('customer_id', { decrypt: true }),
                    "line_items": _this.lineItems
                }
            };
            console.log(dataSet);
            _this._squareService.generateNewOrder(dataSet).subscribe(function (result) {
                _this.locationID = result.order.location_id;
                _this.orderID = result.order.id;
                _this.customerID = result.order.customer_id;
                _this._snackBar.open('New Order Created Successfully. Contunue to Create An Invoice', 'Close');
            });
        });
    };
    InvoicesComponent.prototype.onSubmitInvoice = function () {
        var _this = this;
        this.invoiceBackButton = true;
        var formValues = this.newInvoiceForm.value;
        var dataSet = {
            "idempotency_key": self.crypto.randomUUID(),
            "invoice": {
                "accepted_payment_methods": {
                    "bank_account": false,
                    "buy_now_pay_later": true,
                    "card": false,
                    "square_gift_card": false
                },
                "delivery_method": "EMAIL",
                "location_id": this.locationID,
                "sale_or_service_date": this.formatDate(formValues.date),
                "title": formValues.title,
                "primary_recipient": {
                    "customer_id": this.customerID
                },
                "payment_requests": [
                    {
                        "request_type": formValues.type,
                        "tipping_enabled": false,
                        "due_date": this.formatDate(formValues.due_date),
                        "automatic_payment_source": "NONE",
                        "reminders": [
                            {
                                "relative_scheduled_days": formValues.interval,
                                "message": formValues.remarks
                            }
                        ]
                    }
                ],
                "order_id": this.orderID,
                "scheduled_at": new Date().toISOString()
            }
        };
        console.log(dataSet);
        this._squareService.generateNewInvoice(dataSet).subscribe(function (result) {
            _this._snackBar.open('New Invoice Generated and will be sent to Recipient.', 'Close');
            _this.Invoice = result.invoice;
        });
    };
    InvoicesComponent.prototype.addNewLineItem = function () {
        var _a;
        this.lineItemsCount.push('newLineItem');
        var formValues = this.newOrderForm.value;
        var line_items = {
            "base_price_money": {
                "amount": formValues.amount,
                "currency": formValues.currency
            },
            "quantity": (_a = formValues.quantity) === null || _a === void 0 ? void 0 : _a.toString(),
            "name": formValues.name,
            "note": formValues.remarks
        };
        this.lineItems.push(line_items);
    };
    InvoicesComponent.prototype.formatDate = function (date) {
        return moment(date).format('YYYY-MM-DD');
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
