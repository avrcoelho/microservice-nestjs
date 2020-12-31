import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import redisConfig from '@config/redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: redisConfig,
    },
  );
  app.listen(() => console.log('Microservice post is listening'));
}

bootstrap();
