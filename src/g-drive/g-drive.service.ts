// import { Injectable } from '@nestjs/common';
// import { google } from 'googleapis';
// import * as fs from 'fs';
// import * as path from 'path';

// @Injectable()
// export class GoogleDriveService {
//   private readonly oauth2Client;
//   private readonly drive;

//   constructor() {
//     // Load client credentials from the downloaded `credentials.json` file
//     const credentialsPath = path.join(__dirname, 'credentials.json');
//     const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

//     const { client_id, client_secret, redirect_uris } = credentials.web;
//     this.oauth2Client = new google.auth.OAuth2(
//       client_id,
//       client_secret,
//       redirect_uris[0],
//     );

//     // Setup access tokens
//     this.oauth2Client.setCredentials({
//       access_token: 'YOUR_ACCESS_TOKEN',
//       refresh_token: 'YOUR_REFRESH_TOKEN',
//     });

//     this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
//   }

//   // Generate Auth URL to get OAuth2 consent
//   generateAuthUrl(): string {
//     const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

//     return this.oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: SCOPES,
//     });
//   }

//   // Upload file to Google Drive
//   async uploadFile(file: Express.Multer.File): Promise<any> {
//     const fileMetadata = {
//       name: file.originalname,
//     };

//     const media = {
//       mimeType: file.mimetype,
//       body: fs.createReadStream(file.path),
//     };

//     const response = await this.drive.files.create({
//       requestBody: fileMetadata,
//       media: media,
//       fields: 'id, name, mimeType, webViewLink',
//     });

//     return response.data;
//   }
// }

import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { createHash } from 'crypto';
import { keys } from './service-account-key';

@Injectable()
export class GoogleDriveService {
  private readonly drive;
  private readonly oauth2Client;
  private readonly topFolderId = '1iHikhTqpHGw-0BiPb-unFp5FmgQFfjle'; // Use the provided folder ID

  constructor() {
    this.oauth2Client = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  // Method to hash the file buffer
  private hashFile(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex');
  }

  // Method to get or create a folder by name
  private async getOrCreateFolder(
    folderName: string,
    parentId: string,
  ): Promise<string> {
    const res = await this.drive.files.list({
      q: `name='${folderName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    if (res.data.files.length > 0) {
      return res.data.files[0].id; // Return existing folder ID
    }

    // Create a new folder
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId], // Set parent to the specified parent
    };

    const folderResponse = await this.drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    return folderResponse.data.id; // Return the new folder ID
  }

  // Check if a file already exists in the hash folder
  private async fileExistsInFolder(
    folderId: string,
    fileName: string,
  ): Promise<boolean> {
    const res = await this.drive.files.list({
      q: `name='${fileName}' and '${folderId}' in parents and mimeType!='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    return res.data.files.length > 0; // Return true if a file exists
  }

  // Upload file to Google Drive
  async uploadFile(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileHash = this.hashFile(file.buffer);
    const hashFolderId = await this.getOrCreateFolder(
      fileHash,
      this.topFolderId,
    );

    // Only check if a file exists if the folder is newly created
    const fileExists = await this.fileExistsInFolder(
      hashFolderId,
      file.originalname,
    );
    if (fileExists) {
      throw new Error(
        `A file with the name ${file.originalname} already exists in the folder ${fileHash}.`,
      );
    }

    const fileMetadata = {
      name: file.originalname,
      parents: [hashFolderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    try {
      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, mimeType, webViewLink',
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading file:', JSON.stringify(error));
      throw new Error('Error uploading file to Google Drive');
    }
  }
}
