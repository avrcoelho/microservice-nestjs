import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import redisConfig from '@config/redis';
import UserResolver from './infra/http/graphql/resolvers/User.resolver';
import GetMessageUserResolver from './infra/http/graphql/resolvers/GetUserPost.resolver';

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
  providers: [UserResolver, GetMessageUserResolver],
})
export default class UserModule {}
