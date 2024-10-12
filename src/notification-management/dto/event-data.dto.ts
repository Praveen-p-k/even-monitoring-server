import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NotifiedEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contractAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transactionHash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  blockHash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @ApiProperty()
  @IsNotEmpty()
  eventData: string | number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  blockNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  signature: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  timestamp: number;
}
