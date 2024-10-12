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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventNotificationController = void 0;
const common_1 = require("@nestjs/common");
const event_data_dto_1 = require("./dto/event-data.dto");
const event_notification_service_1 = require("./event-notification.service");
let EventNotificationController = class EventNotificationController {
    constructor(eventNotificationService) {
        this.eventNotificationService = eventNotificationService;
    }
    async notifyEvent(data) {
        const result = await this.eventNotificationService.createEvent(data);
        return result;
    }
    async getEventsByContractAddress(contractAddress) {
        const events = await this.eventNotificationService.getEventDataByContract(contractAddress);
        return { events };
    }
    async getEventsByContractAndName(contractAddress, eventName) {
        const events = await this.eventNotificationService.getEventDataByEventName(contractAddress, eventName);
        return { events };
    }
};
exports.EventNotificationController = EventNotificationController;
__decorate([
    (0, common_1.Post)('/publish-event'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_data_dto_1.NotifiedEventDto]),
    __metadata("design:returntype", Promise)
], EventNotificationController.prototype, "notifyEvent", null);
__decorate([
    (0, common_1.Get)('/:contractAddress/events'),
    __param(0, (0, common_1.Param)('contractAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventNotificationController.prototype, "getEventsByContractAddress", null);
__decorate([
    (0, common_1.Get)(':contractAddress/events/:eventName'),
    __param(0, (0, common_1.Param)('contractAddress')),
    __param(1, (0, common_1.Param)('eventName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventNotificationController.prototype, "getEventsByContractAndName", null);
exports.EventNotificationController = EventNotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [event_notification_service_1.EventNotificationService])
], EventNotificationController);
//# sourceMappingURL=event-notification.controller.js.map