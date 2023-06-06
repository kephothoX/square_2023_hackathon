"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var localstorage_slim_1 = require("localstorage-slim");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_activatedRoute, _router) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this.accountEmail = localstorage_slim_1["default"].get('customer_email_address', { decrypt: true });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _a, _b;
        this.title = (_b = (_a = this._activatedRoute.snapshot.routeConfig) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.toString();
    };
    HeaderComponent.prototype.logOut = function () {
        var _this = this;
        localstorage_slim_1["default"].remove('auth_login_status');
        localstorage_slim_1["default"].remove('customer_id');
        localstorage_slim_1["default"].remove('customer_email_address');
        localstorage_slim_1["default"].remove('active_route');
        localstorage_slim_1["default"].remove('active_subscription_id');
        setTimeout(function () {
            _this._router.navigate(['/selfcare/auth/signin']);
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
