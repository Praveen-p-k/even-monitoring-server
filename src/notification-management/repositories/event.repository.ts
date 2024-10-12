import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EventNotification,
  EventNotificationDocument,
} from 'src/notification-management/schemas/event-data.schema';

@Injectable()
export class EventNotificationRepository {
  constructor(
    @InjectModel(EventNotification.name)
    private readonly notifiedEventModel: Model<EventNotificationDocument>,
  ) {}

  public async createEvent(
    event: EventNotification,
  ): Promise<EventNotificationDocument> {
    const newEvent = new this.notifiedEventModel(event);

    return newEvent.save();
  }

  public getEventDataByContract(
    contractAddress: string,
  ): Promise<EventNotificationDocument[]> {
    return this.notifiedEventModel
      .find({ contractAddress })
      .sort({ createdAt: -1 })
      .exec();
  }

  public getEventDataByContractAndEventName(
    contractAddress: string,
    eventName: string,
  ): Promise<EventNotificationDocument[]> {
    return this.notifiedEventModel
      .find({
        contractAddress,
        eventName,
      })
      .exec();
  }
}
