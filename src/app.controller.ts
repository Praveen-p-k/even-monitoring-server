import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  @HttpCode(HttpStatus.OK)
  checkHealth(): { status: string } {
    return { status: 'ok' };
  }
}
