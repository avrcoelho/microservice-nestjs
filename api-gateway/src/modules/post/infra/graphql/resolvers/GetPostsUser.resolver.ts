import { UseGuards, Inject } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import UserObjectType from '@modules/user/infra/graphql/ObjectsType/User.object';
import PostObjectType from '../ObjectsType/Post.object';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserObjectType)
export default class GetPostsUserResolver {
  constructor(@Inject('POST_SERVICE') private readonly client: ClientProxy) {}

  @ResolveField(() => [PostObjectType])
  public posts(@Parent() user: UserObjectType): Observable<PostObjectType[]> {
    const posts = this.client.send<PostObjectType[], string>(
      'user-posts',
      user.id,
    );

    return posts;
  }
}
