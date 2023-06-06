"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var crypto_js_1 = require("crypto-js");
var localstorage_slim_1 = require("localstorage-slim");
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var AuthService = /** @class */ (function () {
    function AuthService(_errorService, _httpClient, _router, _appService) {
        this._errorService = _errorService;
        this._httpClient = _httpClient;
        this._router = _router;
        this._appService = _appService;
        this.firebaseConfig = {
            apiKey: "AIzaSyBcf-TpG2nQDu0_FrCGcmKJKjMnJ_8OyDM",
            authDomain: "healus-a85f5.firebaseapp.com",
            projectId: "healus-a85f5",
            storageBucket: "healus-a85f5.appspot.com",
            messagingSenderId: "499436687151",
            appId: "1:499436687151:web:6d13d1b04b82db9b159bda",
            measurementId: "G-LKZ7WTHLT7"
        };
        this.app = app_1.initializeApp(this.firebaseConfig);
        this.db = firestore_1.initializeFirestore(this.app, {
            localCache: firestore_1.persistentLocalCache({ tabManager: firestore_1.persistentMultipleTabManager() })
        });
    }
    AuthService.prototype.newSquareCustomer = function (user) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareCustomer", user, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    AuthService.prototype.saveUserCredentials = function (userCreds) {
        return __awaiter(this, void 0, void 0, function () {
            var enc_key, user_password, userCredentials, docRef, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enc_key = crypto_js_1["default"].enc.Base64.parse("" + userCreds.email_address).toString();
                        user_password = "" + userCreds.password;
                        userCredentials = {
                            created_at: firestore_1.serverTimestamp(),
                            updated_at: firestore_1.serverTimestamp(),
                            email_address: userCreds.email_address,
                            password: crypto_js_1["default"].AES.encrypt(user_password, enc_key).toString(),
                            isActive: false
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        docRef = firestore_1.doc(this.db, 'UserCredentials', "" + userCreds.email_address);
                        return [4 /*yield*/, firestore_1.setDoc(docRef, userCredentials, { merge: true })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Error Writting document', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.saveAdminUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var enc_key, user_password, adminUser, docRef, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enc_key = crypto_js_1["default"].enc.Base64.parse("" + userData.email_address).toString();
                        user_password = "" + userData.password;
                        adminUser = {
                            id: self.crypto.randomUUID().toString().toUpperCase(),
                            given_name: userData.given_name,
                            family_name: userData.family_name,
                            phone_number: userData.phone_number,
                            created_at: firestore_1.serverTimestamp(),
                            updated_at: firestore_1.serverTimestamp(),
                            email_address: userData.email_address,
                            password: crypto_js_1["default"].AES.encrypt(user_password, enc_key).toString(),
                            isActive: false,
                            isAuthorizedAdmin: false
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        docRef = firestore_1.doc(this.db, 'AdminUser', "" + userData.email_address);
                        return [4 /*yield*/, firestore_1.setDoc(docRef, adminUser, { merge: true })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log('Error Writting document', err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getLocationId = function () {
        return this._httpClient.get(this._appService.FirebaseFunctionsEndpoint + "/getSquareMainLocation", this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    AuthService.prototype.getuserByEmailAddress = function (email) {
        var qs = {
            "limit": 1,
            "query": {
                "filter": {
                    "email_address": {
                        "exact": email
                    }
                }
            }
        };
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareCustomerByEmail", qs, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    AuthService.prototype.loginUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var enc_key, docRef, docSnap, docData_1, pass;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enc_key = crypto_js_1["default"].enc.Base64.parse("" + data.email_address).toString();
                        docRef = firestore_1.doc(this.db, 'UserCredentials', "" + data.email_address);
                        return [4 /*yield*/, firestore_1.getDoc(docRef)];
                    case 1:
                        docSnap = _a.sent();
                        if (docSnap.exists()) {
                            docData_1 = docSnap.data();
                            pass = docData_1['password'];
                            if (data.password == crypto_js_1["default"].AES.decrypt(docData_1['password'], crypto_js_1["default"].enc.Base64.parse("" + data.email_address).toString()).toString(crypto_js_1["default"].enc.Utf8)) {
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, firestore_1.updateDoc(docRef, { isActive: true })];
                                            case 1:
                                                _a.sent();
                                                this.getuserByEmailAddress("" + data.email_address).subscribe(function (result) {
                                                    localstorage_slim_1["default"].set('auth_login_status', docData_1['isActive'], { encrypt: true });
                                                    localstorage_slim_1["default"].set('customer_id', result.customers[0].id, { encrypt: true });
                                                    localstorage_slim_1["default"].set('customer_email_address', result.customers[0].email_address, { encrypt: true });
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                setTimeout(function () {
                                    _this._router.navigate(['/selfcare']);
                                }, 1000);
                                return [2 /*return*/, 'Subscribe to your preffered package.'];
                            }
                            else {
                                return [2 /*return*/, "Wrong Credentials, Passwords didn't match."];
                            }
                        }
                        else {
                            return [2 /*return*/, 'No user exists, with those Credentials.'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.loginAdmin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var enc_key, docRef, docSnap, docData, pass;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enc_key = crypto_js_1["default"].enc.Base64.parse("" + data.email_address).toString();
                        docRef = firestore_1.doc(this.db, 'AdminUser', "" + data.email_address);
                        return [4 /*yield*/, firestore_1.getDoc(docRef)];
                    case 1:
                        docSnap = _a.sent();
                        if (!docSnap.exists()) return [3 /*break*/, 5];
                        docData = docSnap.data();
                        pass = docData['password'];
                        if (!(data.password == crypto_js_1["default"].AES.decrypt(docData['password'], crypto_js_1["default"].enc.Base64.parse("" + data.email_address).toString()).toString(crypto_js_1["default"].enc.Utf8))) return [3 /*break*/, 3];
                        return [4 /*yield*/, firestore_1.updateDoc(docRef, { isActive: true })];
                    case 2:
                        _a.sent();
                        localstorage_slim_1["default"].set('canLoginAsAdmin', docData['isAuthorizedAdmin'], { encrypt: true });
                        setTimeout(function () {
                            _this._router.navigate(['/admin']);
                        });
                        return [2 /*return*/, 'Now Logged In As Admin'];
                    case 3: return [2 /*return*/, "Wrong Credentials, Passwords didn't match."];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, 'No user exists, with those Credentials.'];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.isAdminLoggedIn = function () {
        return Boolean(localstorage_slim_1["default"].get('canLoginAsAdmin', { decrypt: true }));
    };
    AuthService.prototype.isUserLoggedIn = function () {
        var _this = this;
        var status = Boolean(localstorage_slim_1["default"].get('auth_login_status', { decrypt: true }));
        if (status == true) {
            return true;
        }
        else {
            setTimeout(function () {
                _this._router.navigate(['/selfcare/auth/signin']);
            });
            return false;
        }
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
