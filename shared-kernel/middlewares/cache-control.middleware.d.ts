import { Response, NextFunction } from 'express';
import { NestMiddleware } from '@nestjs/common';
export declare class NoCacheMiddleware implements NestMiddleware {
    use(_: Request, res: Response, next: NextFunction): void;
}
