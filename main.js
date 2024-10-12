"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const express_1 = require("express");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const api_response_exception_filter_1 = require("./shared-kernel/exceptions/api-response.exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.useGlobalFilters(new api_response_exception_filter_1.GlobalExceptionFilter());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.enableCors({
        origin: (origin, callback) => {
            if (!config_1.config.APP_CORS_WHITELIST_URLS ||
                config_1.config.APP_CORS_WHITELIST_URLS.includes(origin) ||
                config_1.config.APP_CORS_WHITELIST_URLS === '*' ||
                !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
                frameAncestors: ["'none'"],
            },
        },
    }));
    app.use(helmet_1.default.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix(config_1.config.APP_BACKEND_PREFIX);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Event monitoring APIs')
        .setDescription('Blockchain event monitoring APIs')
        .setVersion('1.0')
        .addTag('EventMonitor')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(config_1.config.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map