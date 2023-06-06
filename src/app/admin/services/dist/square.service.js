"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SquareService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var SquareService = /** @class */ (function () {
    function SquareService(_errorService, _appService, _httpClient) {
        this._errorService = _errorService;
        this._appService = _appService;
        this._httpClient = _httpClient;
    }
    SquareService.prototype.addNewCatalog = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareCatalog", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.listCatalog = function () {
        return this._httpClient.get(this._appService.FirebaseFunctionsEndpoint + "/getSquareCatalog", this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getCatalogObject = function (object_id) {
        return this._httpClient.get(this._appService.FirebaseFunctionsEndpoint + "/catalog/" + object_id, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.addNewLocation = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareLocation", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.updateLocation = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/updateSquareLocation", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.listLocations = function () {
        return this._httpClient.get(this._appService.FirebaseFunctionsEndpoint + "/getSquareLocations", this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getLocation = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareLocation", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.editLocation = function (location) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/editSquareLocation", location, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getUsers = function () {
        return this._httpClient.get(this._appService.FirebaseFunctionsEndpoint + "/getSquareUsers", this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getUser = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareUser", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.updateUser = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/updateSquareUser", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.deleteUser = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/deleteSquareUser", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getInvoices = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareInvoices", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SquareService);
    return SquareService;
}());
exports.SquareService = SquareService;
