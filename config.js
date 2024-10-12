"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_BACKEND_PREFIX: process.env.APP_BACKEND_PREFIX,
    APP_CORS_WHITELIST_URLS: process.env.APP_CORS_WHITELIST_URLS,
    MONGODB_URL: process.env.MONGODB_URL,
};
//# sourceMappingURL=config.js.map