"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveModule = void 0;
const common_1 = require("@nestjs/common");
const g_drive_service_1 = require("./g-drive.service");
const g_drive_controller_1 = require("./g-drive.controller");
let GoogleDriveModule = class GoogleDriveModule {
};
exports.GoogleDriveModule = GoogleDriveModule;
exports.GoogleDriveModule = GoogleDriveModule = __decorate([
    (0, common_1.Module)({
        providers: [g_drive_service_1.GoogleDriveService],
        controllers: [g_drive_controller_1.FileUploadController],
    })
], GoogleDriveModule);
//# sourceMappingURL=g-drive.module.js.map