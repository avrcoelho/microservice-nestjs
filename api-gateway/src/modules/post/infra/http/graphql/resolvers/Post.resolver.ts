import { UseGuards, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context, ID } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/http/guards/jwt-auth.guard';
import PostDTO from '../dtos/Post.dto';
import PostModel from '../models/Post.model';

interface IUser {
  id: string;
}

type PostCreateDTO = PostDTO & { user_id: string };
type PostUpdateDTO = { data: PostDTO; id: string };

@UseGuards(JwtAuthGuard)
@Resolver(() => PostModel)
export default class PostResolver {
  constructor(
    @Inject('POST_SERVICE') private readonly client: ClientProxy,

    @Inject('PubSub')
    private pubSub: PubSub,
  ) {}

  @Query(() => [PostModel])
  public getUserPosts(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostModel[]> {
    const posts = this.client.send<PostModel[], string>('user-posts', id);

    return posts;
  }

  @Query(() => PostModel)
  public getPost(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostModel> {
    const post = this.client.send<PostModel, string>('show-post', id);

    return post;
  }

  @Mutation(() => PostModel)
  public createPost(
    @Context('user') user: IUser,
    @Args('data') input: PostDTO,
  ): Observable<PostModel> {
    const post = this.client.send<PostModel, PostCreateDTO>('create-post', {
      user_id: user.id,
      ...input,
    });

    this.pubSub.publish('postAdded', { postAdded: post });

    return post;
  }

  @Mutation(() => PostModel)
  public updatePost(
    @Args('data') input: PostDTO,
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostModel> {
    const post = this.client.send<PostModel, PostUpdateDTO>('update-post', {
      data: input,
      id,
    });

    this.pubSub.publish('postUpdated', { postUpdated: post });

    return post;
  }

  @Mutation(() => Boolean)
  public deletePost(@Args({ name: 'id', type: () => ID }) id: string): boolean {
    this.client.emit<PostModel, string>('delete-post', id);

    this.pubSub.publish('postDelected', { postDelected: id });

    return true;
  }
}
