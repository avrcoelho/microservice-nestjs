import { NestFactory } from '@nestjs/core';

import { HttpExceptionFilter } from '@shared/infra/graphql/filters/HttpException.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3333);
}
bootstrap();
