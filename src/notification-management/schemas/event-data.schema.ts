import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventNotificationDocument = EventNotification & Document;

@Schema({ timestamps: true })
export class EventNotification extends Document {
  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  contractAddress: string;

  @Prop({ required: true, type: Number })
  timestamp: number;

  @Prop({ required: true })
  blockNumber: number;

  @Prop({ required: true })
  blockHash: string;

  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true })
  signature: string;

  @Prop({ type: Object, required: true })
  eventData: Record<string, any>;
}

export const EventNotificationSchema =
  SchemaFactory.createForClass(EventNotification);
