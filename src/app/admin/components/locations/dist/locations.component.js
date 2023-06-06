"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocationsComponent = void 0;
var core_1 = require("@angular/core");
var LocationsComponent = /** @class */ (function () {
    function LocationsComponent(_squareService) {
        this._squareService = _squareService;
        this.locations = [];
        this.displayedColumns = ['name', 'description', 'phone_number', 'type', 'status', 'id'];
    }
    LocationsComponent.prototype.ngOnInit = function () {
        this.getLocations();
    };
    LocationsComponent.prototype.getLocations = function () {
        var _this = this;
        this._squareService.listLocations().subscribe(function (results) {
            _this.locations = results.locations;
        });
    };
    LocationsComponent.prototype.deleteLocation = function (id) {
    };
    LocationsComponent = __decorate([
        core_1.Component({
            selector: 'app-locations',
            templateUrl: './locations.component.html',
            styleUrls: ['./locations.component.scss']
        })
    ], LocationsComponent);
    return LocationsComponent;
}());
exports.LocationsComponent = LocationsComponent;
