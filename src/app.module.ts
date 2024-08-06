import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/users/user.module';
import { ComicsModule } from './module/comics/comics.module';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './strategys/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/config'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [Configuration]
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('database.mongouri'),
    }),
    inject:[ConfigService],
  }),
    UserModule,
    ComicsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule { }