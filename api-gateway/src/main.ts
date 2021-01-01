import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import TimeoutInterceptor from '@shared/infra/graphql/interceptors/Timeout.interceptor';
import { HttpExceptionFilter } from '@shared/infra/graphql/filters/HttpException.filter';
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
