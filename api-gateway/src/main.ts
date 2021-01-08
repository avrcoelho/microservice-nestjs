import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import TimeoutInterceptor from '@shared/infra/http/interceptors/Timeout.interceptor';
import { HttpExceptionFilter } from '@shared/infra/http/filters/HttpException.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3333);
}
bootstrap();
