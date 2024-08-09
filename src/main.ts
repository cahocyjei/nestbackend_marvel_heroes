import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //app.enableCors({
  //  origin: `${configService.get<string>('dominio.frontend')}`, // Reemplaza con el dominio de tu frontend
  //  credentials: true,
  //});
  //app.use(cookieParser());
  await app.listen(configService.get<number>('api.port')|3000);
  console.log(`Aplication is running on: ${await app.getUrl()}: environment: ${configService.get<string>('api.environment')}`);
}
bootstrap();
