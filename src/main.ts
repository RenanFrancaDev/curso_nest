import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa o ClassSerializerInterceptor globalmente
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove unnecessary key
      forbidNonWhitelisted: true, //return error if user send unecessary key
      transform: false, //Try transform type of params (ex: id)
    }),
    new ParseIntIdPipe(), //Pipe personalizado inserido globalmente
  );
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
