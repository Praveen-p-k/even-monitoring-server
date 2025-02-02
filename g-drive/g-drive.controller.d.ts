import { GoogleDriveService } from './g-drive.service';
export declare class FileUploadController {
    private readonly googleDriveService;
    constructor(googleDriveService: GoogleDriveService);
    uploadFile(file: Express.Multer.File): Promise<any>;
}
