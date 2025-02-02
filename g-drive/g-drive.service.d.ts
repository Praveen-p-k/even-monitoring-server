export declare class GoogleDriveService {
    private readonly drive;
    private readonly oauth2Client;
    private readonly topFolderId;
    constructor();
    private hashFile;
    private getOrCreateFolder;
    private fileExistsInFolder;
    uploadFile(file: Express.Multer.File): Promise<any>;
}
