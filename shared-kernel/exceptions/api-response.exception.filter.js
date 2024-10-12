"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message;
        if (exception instanceof common_1.HttpException) {
            const response = exception.getResponse();
            status = exception.getStatus();
            message =
                typeof response === 'string' ? response : JSON.stringify(response);
            this.logger.error(`Status: ${status} Error: ${JSON.stringify(message)}`);
        }
        else if (this.isAWSException(exception)) {
            status = exception.$metadata.httpStatusCode;
            this.logger.error(`AWS Error: ${exception.name}`, exception.stack);
            const awsMessage = `An error occurred (${exception.name}).`;
            message =
                config_1.config.NODE_ENV === 'development' ? exception.message : awsMessage;
            this.logger.error({
                message: exception.message,
                requestId: exception.$metadata.requestId,
                statusCode: exception.$metadata.httpStatusCode,
            });
        }
        else {
            message = exception.message;
            this.logger.error({
                name: exception.name,
                message: exception.message ?? 'Unknown Error Occurred',
            });
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
    isAWSException(error) {
        return (error &&
            typeof error === 'object' &&
            'name' in error &&
            '$metadata' in error &&
            'httpStatusCode' in error.$metadata);
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=api-response.exception.filter.js.map