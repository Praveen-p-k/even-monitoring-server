import { Module } from '@nestjs/common';
import { GoogleDriveService } from './g-drive.service';
import { FileUploadController } from './g-drive.controller';

@Module({
  providers: [GoogleDriveService],
  controllers: [FileUploadController],
})
export class GoogleDriveModule {}
