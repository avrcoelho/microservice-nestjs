import { Inject } from '@nestjs/common';
import { Args, Resolver, Subscription, ID } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import UserObjectType from '@modules/user/infra/graphql/ObjectsType/User.object';
import PostObjectType from '../ObjectsType/Post.object';

@Resolver(() => UserObjectType)
export default class GetPostsUserResolver {
  constructor(
    @Inject('PubSub')
    private pubSub: PubSub,
  ) {}

  @Subscription(() => PostObjectType, {
    filter: (payload, variables) =>
      String(payload.postAdded.user_id) === variables.user_id,
  })
  postAdded(@Args({ name: 'user_id', type: () => ID }) user_id: string) {
    return this.pubSub.asyncIterator('postAdded');
  }

  @Subscription(() => PostObjectType, {
    filter: (payload, variables) => {
      return String(payload.postUpdated.user_id) === variables.user_id;
    },
  })
  postUpdated(@Args({ name: 'user_id', type: () => ID }) user_id: string) {
    return this.pubSub.asyncIterator('postUpdated');
  }

  @Subscription(() => PostObjectType, {
    filter: (payload, variables) =>
      String(payload.postDelected.user_id) === variables.user_id,
  })
  postDelected(@Args({ name: 'user_id', type: () => ID }) user_id: string) {
    return this.pubSub.asyncIterator('postDelected');
  }
}
