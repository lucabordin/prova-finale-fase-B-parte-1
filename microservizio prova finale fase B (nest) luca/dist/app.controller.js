"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const eventoOrdinareSe0_event_1 = require("./Eventi/eventoOrdinareSe0.event");
const eventoOrdinareseMeno0_event_1 = require("./Eventi/eventoOrdinareseMeno0.event");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    gestistiOrdine1(data) {
        this.appService.gestisciNuovoOrdineDa0Event(data.ordinareDa0);
    }
    gestistiOrdine2(data) {
        this.appService.gestisciNuovoOrdineDaMeno0Event(data.ordinareDaMeno0);
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.EventPattern)('nuovo_ordine1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [eventoOrdinareSe0_event_1.NuovoOrdineDa0Event]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "gestistiOrdine1", null);
__decorate([
    (0, microservices_1.EventPattern)('nuovo_ordine2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [eventoOrdinareseMeno0_event_1.NuovoOrdineDaMeno0Event]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "gestistiOrdine2", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map