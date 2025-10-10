import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove unnecessary key
      forbidNonWhitelisted: true, //return error if user send unecessary key
      transform: false, //Try transform type of params (ex: id)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
