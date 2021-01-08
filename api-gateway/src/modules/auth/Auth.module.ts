import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import redisConfig from '@config/redis';
import AuthResolver from './infra/http/graphql/resolvers/Auth.resolver';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: redisConfig,
      },
    ]),
  ],
  providers: [AuthResolver, JwtStrategy],
})
export default class AuthModule {}
