import { Module } from '@nestjs/common';
import { EventNotificationService } from 'src/notification-management/event-notification.service';
import { EventNotificationController } from 'src/notification-management/event-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventNotification,
  EventNotificationSchema,
} from 'src/notification-management/schemas/event-data.schema';
import { EventNotificationRepository } from 'src/notification-management/repositories/event.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventNotification.name, schema: EventNotificationSchema },
    ]),
  ],
  controllers: [EventNotificationController],
  providers: [EventNotificationService, EventNotificationRepository],
})
export class EventNotificationsModule {}
