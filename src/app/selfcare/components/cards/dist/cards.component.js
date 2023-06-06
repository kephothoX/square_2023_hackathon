"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardsComponent = void 0;
var core_1 = require("@angular/core");
var localstorage_slim_1 = require("localstorage-slim");
var CardsComponent = /** @class */ (function () {
    function CardsComponent(_squareService) {
        this._squareService = _squareService;
        this.cards = [];
        this.displayedColumns = ['card_brand', 'last_4', 'exp', 'cardholder_name', 'card_type', 'created_at', 'id'];
    }
    CardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._squareService.getCustomerCards({ id: "" + localstorage_slim_1["default"].get('customer_id', { decrypt: true }) }).subscribe(function (result) {
            _this.cards = result.cards;
            console.log(result);
        });
    };
    CardsComponent.prototype.disableCard = function (id) {
        this._squareService.disableCard({ id: id }).subscribe(function (result) {
            console.log(result);
        });
    };
    CardsComponent = __decorate([
        core_1.Component({
            selector: 'app-cards',
            templateUrl: './cards.component.html',
            styleUrls: ['./cards.component.scss']
        })
    ], CardsComponent);
    return CardsComponent;
}());
exports.CardsComponent = CardsComponent;
