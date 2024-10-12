import { NotifiedEventDto } from 'src/notification-management/dto/event-data.dto';
import { EventNotificationService } from 'src/notification-management/event-notification.service';
export declare class EventNotificationController {
    private readonly eventNotificationService;
    constructor(eventNotificationService: EventNotificationService);
    notifyEvent(data: NotifiedEventDto): Promise<import("./schemas/event-data.schema").EventNotificationDocument>;
    getEventsByContractAddress(contractAddress: string): Promise<{
        events: any;
    }>;
    getEventsByContractAndName(contractAddress: string, eventName: string): Promise<{
        events: any;
    }>;
}
