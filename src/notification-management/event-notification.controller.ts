import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { NotifiedEventDto } from 'src/notification-management/dto/event-data.dto';
import { EventNotificationService } from 'src/notification-management/event-notification.service';

@Controller('notifications')
export class EventNotificationController {
  constructor(
    private readonly eventNotificationService: EventNotificationService,
  ) {}

  @Post('/publish-event')
  @HttpCode(HttpStatus.CREATED)
  async notifyEvent(@Body() data: NotifiedEventDto) {
    const result = await this.eventNotificationService.createEvent(data);
    return result;
  }

  @Get('/:contractAddress/events')
  async getEventsByContractAddress(
    @Param('contractAddress') contractAddress: string,
  ) {
    const events =
      await this.eventNotificationService.getEventDataByContract(
        contractAddress,
      );
    return { events };
  }

  @Get(':contractAddress/events/:eventName')
  async getEventsByContractAndName(
    @Param('contractAddress') contractAddress: string,
    @Param('eventName') eventName: string,
  ) {
    const events = await this.eventNotificationService.getEventDataByEventName(
      contractAddress,
      eventName,
    );
    return { events };
  }
}
