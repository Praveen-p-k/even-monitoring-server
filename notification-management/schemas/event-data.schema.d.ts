import { Document } from 'mongoose';
export type EventNotificationDocument = EventNotification & Document;
export declare class EventNotification extends Document {
    eventName: string;
    contractAddress: string;
    timestamp: number;
    blockNumber: number;
    blockHash: string;
    transactionHash: string;
    signature: string;
    eventData: Record<string, any>;
}
export declare const EventNotificationSchema: import("mongoose").Schema<EventNotification, import("mongoose").Model<EventNotification, any, any, any, Document<unknown, any, EventNotification> & EventNotification & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventNotification, Document<unknown, {}, import("mongoose").FlatRecord<EventNotification>> & import("mongoose").FlatRecord<EventNotification> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
