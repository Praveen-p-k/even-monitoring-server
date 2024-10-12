"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventNotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const event_notification_service_1 = require("./event-notification.service");
const event_notification_controller_1 = require("./event-notification.controller");
const mongoose_1 = require("@nestjs/mongoose");
const event_data_schema_1 = require("./schemas/event-data.schema");
const event_repository_1 = require("./repositories/event.repository");
let EventNotificationsModule = class EventNotificationsModule {
};
exports.EventNotificationsModule = EventNotificationsModule;
exports.EventNotificationsModule = EventNotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_data_schema_1.EventNotification.name, schema: event_data_schema_1.EventNotificationSchema },
            ]),
        ],
        controllers: [event_notification_controller_1.EventNotificationController],
        providers: [event_notification_service_1.EventNotificationService, event_repository_1.EventNotificationRepository],
    })
], EventNotificationsModule);
//# sourceMappingURL=event-notification.module.js.map