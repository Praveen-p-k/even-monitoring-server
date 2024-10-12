import { Model } from 'mongoose';
import { EventNotification, EventNotificationDocument } from 'src/notification-management/schemas/event-data.schema';
export declare class EventNotificationRepository {
    private readonly notifiedEventModel;
    constructor(notifiedEventModel: Model<EventNotificationDocument>);
    createEvent(event: EventNotification): Promise<EventNotificationDocument>;
    getEventDataByContract(contractAddress: string): Promise<EventNotificationDocument[]>;
    getEventDataByContractAndEventName(contractAddress: string, eventName: string): Promise<EventNotificationDocument[]>;
}
