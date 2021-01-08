import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ClientsModule, Transport } from '@nestjs/microservices';

import redisConfig from '@config/redis';
import PostResolver from './infra/http/graphql/resolvers/Post.resolver';
import GetPostsUserResolver from './infra/http/graphql/resolvers/GetPostsUser.resolver';
import PostSubscriptionsResolver from './infra/http/graphql/resolvers/PostSubscriptions.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.REDIS,
        options: redisConfig,
      },
    ]),
  ],
  providers: [
    PostResolver,
    GetPostsUserResolver,
    PostSubscriptionsResolver,
    {
      provide: 'PubSub',
      useValue: new PubSub(),
    },
  ],
})
export default class PostModule {}
