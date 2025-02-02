"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
const crypto_1 = require("crypto");
const service_account_key_1 = require("./service-account-key");
let GoogleDriveService = class GoogleDriveService {
    constructor() {
        this.topFolderId = '1iHikhTqpHGw-0BiPb-unFp5FmgQFfjle';
        this.oauth2Client = new googleapis_1.google.auth.GoogleAuth({
            credentials: service_account_key_1.keys,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });
        this.drive = googleapis_1.google.drive({ version: 'v3', auth: this.oauth2Client });
    }
    hashFile(buffer) {
        return (0, crypto_1.createHash)('sha256').update(buffer).digest('hex');
    }
    async getOrCreateFolder(folderName, parentId) {
        const res = await this.drive.files.list({
            q: `name='${folderName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder'`,
            fields: 'files(id, name)',
        });
        if (res.data.files.length > 0) {
            return res.data.files[0].id;
        }
        const folderMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentId],
        };
        const folderResponse = await this.drive.files.create({
            requestBody: folderMetadata,
            fields: 'id',
        });
        return folderResponse.data.id;
    }
    async fileExistsInFolder(folderId, fileName) {
        const res = await this.drive.files.list({
            q: `name='${fileName}' and '${folderId}' in parents and mimeType!='application/vnd.google-apps.folder'`,
            fields: 'files(id, name)',
        });
        return res.data.files.length > 0;
    }
    async uploadFile(file) {
        if (!file) {
            throw new Error('No file provided');
        }
        const fileHash = this.hashFile(file.buffer);
        const hashFolderId = await this.getOrCreateFolder(fileHash, this.topFolderId);
        const fileExists = await this.fileExistsInFolder(hashFolderId, file.originalname);
        if (fileExists) {
            throw new Error(`A file with the name ${file.originalname} already exists in the folder ${fileHash}.`);
        }
        const fileMetadata = {
            name: file.originalname,
            parents: [hashFolderId],
        };
        const media = {
            mimeType: file.mimetype,
            body: stream_1.Readable.from(file.buffer),
        };
        try {
            const response = await this.drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, name, mimeType, webViewLink',
            });
            return response.data;
        }
        catch (error) {
            console.error('Error uploading file:', JSON.stringify(error));
            throw new Error('Error uploading file to Google Drive');
        }
    }
};
exports.GoogleDriveService = GoogleDriveService;
exports.GoogleDriveService = GoogleDriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleDriveService);
//# sourceMappingURL=g-drive.service.js.map