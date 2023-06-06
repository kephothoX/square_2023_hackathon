"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriptionPlansComponent = void 0;
var core_1 = require("@angular/core");
var SubscriptionPlansComponent = /** @class */ (function () {
    function SubscriptionPlansComponent(_squareService) {
        this._squareService = _squareService;
        this.displayedColumns = ['id', 'version', 'name', 'cadence', 'amount'];
        this.subscriptions = [];
    }
    SubscriptionPlansComponent.prototype.ngOnInit = function () {
        var _this = this;
        var qs = {
            "query": {
                "filter": {
                    "location_ids": [
                        "L65G08M451324"
                    ]
                }
            }
        };
        this._squareService.listCatalog().subscribe(function (result) {
            _this.subscriptions = result.objects;
            console.log(_this.subscriptions);
            console.log(result);
        });
    };
    SubscriptionPlansComponent = __decorate([
        core_1.Component({
            selector: 'app-subscription-plans',
            templateUrl: './subscription-plans.component.html',
            styleUrls: ['./subscription-plans.component.scss']
        })
    ], SubscriptionPlansComponent);
    return SubscriptionPlansComponent;
}());
exports.SubscriptionPlansComponent = SubscriptionPlansComponent;
