import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import PostObjectType from '@modules/post/infra/graphql/ObjectsType/Post.object';
import UserObjectType from '../ObjectsType/User.object';

@UseGuards(JwtAuthGuard)
@Resolver(() => PostObjectType)
export default class GetUserPostResolver {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @ResolveField(() => UserObjectType)
  public async user(
    @Parent() post: PostObjectType,
  ): Promise<Observable<UserObjectType>> {
    const userData = this.client.send<UserObjectType, string>(
      'show-user',
      post.user_id,
    );

    return userData;
  }
}
