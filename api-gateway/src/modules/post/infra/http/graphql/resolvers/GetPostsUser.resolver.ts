import { UseGuards, Inject } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/http/guards/jwt-auth.guard';
import UserModel from '@modules/user/infra/http/graphql/models/User.model';
import PostModel from '../models/Post.model';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserModel)
export default class GetPostsUserResolver {
  constructor(@Inject('POST_SERVICE') private readonly client: ClientProxy) {}

  @ResolveField(() => [PostModel])
  public posts(@Parent() user: UserModel): Observable<PostModel[]> {
    const posts = this.client.send<PostModel[], string>('user-posts', user.id);

    return posts;
  }
}
