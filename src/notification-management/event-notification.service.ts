import { Injectable, Logger } from '@nestjs/common';
import { EventNotificationRepository } from 'src/notification-management/repositories/event.repository';
import { NotifiedEventDto } from 'src/notification-management/dto/event-data.dto';
import { EventNotification } from './schemas/event-data.schema';

@Injectable()
export class EventNotificationService {
  private logger: Logger = new Logger(EventNotificationService.name);

  constructor(
    private readonly eventNotificationRepository: EventNotificationRepository,
  ) {}

  public createEvent(notifiedEvent: NotifiedEventDto) {
    const {
      eventData,
      contractAddress,
      eventName,
      blockNumber,
      blockHash,
      transactionHash,
      signature,
    } = notifiedEvent;

    this.logger.log(`Event Notification Received:
      - Event Name: "${eventName}"
      - Contract Address: "${contractAddress}"
      - Timestamp: ${notifiedEvent.timestamp}
      - Block Number: ${blockNumber}
      - Block Hash: ${blockHash}
      - Transaction Hash: ${transactionHash}
      - Signature: ${signature}
      - Event Data: ${JSON.stringify(eventData, null, 2)}`);

    return this.eventNotificationRepository.createEvent(
      notifiedEvent as unknown as EventNotification,
    );
  }

  public getEventDataByContract(contractAddress: string): Promise<any> {
    return this.eventNotificationRepository.getEventDataByContract(
      contractAddress,
    );
  }

  public getEventDataByEventName(
    contractAddress: string,
    eventName: string,
  ): Promise<any> {
    return this.eventNotificationRepository.getEventDataByContractAndEventName(
      contractAddress,
      eventName,
    );
  }
}
