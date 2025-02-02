import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { NoCacheMiddleware } from 'src/shared-kernel/middlewares/cache-control.middleware';
import { EventNotificationsModule } from 'src/notification-management/event-notification.module';
import { config } from 'src/config';
import { GoogleDriveModule } from './g-drive/g-drive.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URL),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventNotificationsModule,
    GoogleDriveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoCacheMiddleware).forRoutes('*');
  }
}
