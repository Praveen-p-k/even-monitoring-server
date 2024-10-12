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
var EventNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventNotificationService = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("./repositories/event.repository");
let EventNotificationService = EventNotificationService_1 = class EventNotificationService {
    constructor(eventNotificationRepository) {
        this.eventNotificationRepository = eventNotificationRepository;
        this.logger = new common_1.Logger(EventNotificationService_1.name);
    }
    createEvent(notifiedEvent) {
        const { eventData, contractAddress, eventName, blockNumber, blockHash, transactionHash, signature, } = notifiedEvent;
        this.logger.log(`Event Notification Received:
      - Event Name: "${eventName}"
      - Contract Address: "${contractAddress}"
      - Timestamp: ${notifiedEvent.timestamp}
      - Block Number: ${blockNumber}
      - Block Hash: ${blockHash}
      - Transaction Hash: ${transactionHash}
      - Signature: ${signature}
      - Event Data: ${JSON.stringify(eventData, null, 2)}`);
        return this.eventNotificationRepository.createEvent(notifiedEvent);
    }
    getEventDataByContract(contractAddress) {
        return this.eventNotificationRepository.getEventDataByContract(contractAddress);
    }
    getEventDataByEventName(contractAddress, eventName) {
        return this.eventNotificationRepository.getEventDataByContractAndEventName(contractAddress, eventName);
    }
};
exports.EventNotificationService = EventNotificationService;
exports.EventNotificationService = EventNotificationService = EventNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_repository_1.EventNotificationRepository])
], EventNotificationService);
//# sourceMappingURL=event-notification.service.js.map