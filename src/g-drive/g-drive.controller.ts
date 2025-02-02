import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from './g-drive.service';

@Controller('files')
export class FileUploadController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the name of the form field
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.googleDriveService.uploadFile(file);
  }
}
