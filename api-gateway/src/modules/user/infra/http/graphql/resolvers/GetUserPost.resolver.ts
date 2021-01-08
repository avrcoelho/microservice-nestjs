import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import PostModel from '@modules/post/infra/http/graphql/models/Post.model';
import UserModel from '../models/User.model';

@UseGuards(JwtAuthGuard)
@Resolver(() => PostModel)
export default class GetUserPostResolver {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @ResolveField(() => UserModel)
  public async user(@Parent() post: PostModel): Promise<Observable<UserModel>> {
    const userData = this.client.send<UserModel, string>(
      'show-user',
      post.user_id,
    );

    return userData;
  }
}
