import { EventNotificationRepository } from 'src/notification-management/repositories/event.repository';
import { NotifiedEventDto } from 'src/notification-management/dto/event-data.dto';
export declare class EventNotificationService {
    private readonly eventNotificationRepository;
    private logger;
    constructor(eventNotificationRepository: EventNotificationRepository);
    createEvent(notifiedEvent: NotifiedEventDto): Promise<import("./schemas/event-data.schema").EventNotificationDocument>;
    getEventDataByContract(contractAddress: string): Promise<any>;
    getEventDataByEventName(contractAddress: string, eventName: string): Promise<any>;
}
