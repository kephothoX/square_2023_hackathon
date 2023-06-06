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
var js_api_loader_1 = require("@googlemaps/js-api-loader");
var LocationsComponent = /** @class */ (function () {
    function LocationsComponent(_squareService) {
        this._squareService = _squareService;
        this.visibility = 'hidden';
        this.btnClosevisibility = 'hidden';
        this.AddressType = ['PHYSICAL', 'MOBILE'];
        this.API_KEY = '****************************************************';
        this.MapChoice = '';
        this.loader = new js_api_loader_1.Loader({
            'apiKey': this.API_KEY,
            'version': 'weekly',
            'libraries': ['geometry', 'places']
        });
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
    LocationsComponent.prototype.findMe = function (lat, lng) {
        this.visibility = 'inherit';
        this.initMap(lat, lng);
    };
    LocationsComponent.prototype.initMap = function (lat, lng) {
        this.btnClosevisibility = 'inherit';
        this.loader.load()
            .then(function () {
            var latLng = new google.maps.LatLng(lat, lng);
            var map = new google.maps.Map(document.getElementById('findMe'), {
                mapId: '98d1420b851b24cd',
                zoom: 16,
                center: latLng,
                mapTypeId: 'roadmap'
            });
            var svgMarker = {
                path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: "#9500c2",
                strokeColor: "#f0f7ff",
                fillOpacity: 0.9,
                rotation: 2.5,
                scale: 2.5,
                strokeWidth: 0.5,
                anchor: new google.maps.Point(15, 30)
            };
            map.setCenter(latLng);
            new google.maps.Marker({
                position: latLng,
                map: map,
                icon: svgMarker,
                animation: google.maps.Animation.DROP
            });
        });
    };
    LocationsComponent.prototype.btnClose = function () {
        this.visibility = 'hidden';
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
