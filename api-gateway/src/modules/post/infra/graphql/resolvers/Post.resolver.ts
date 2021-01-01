import { UseGuards, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context, ID } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import CreatePostDTO from '../dtos/CreatePost.dto';
import UpdatePostDTO from '../dtos/UpdatePost.dto';
import PostModel from '../models/Post.model';

interface IUser {
  id: string;
}

type PostInputCreate = CreatePostDTO & { user_id: string };
type PostInputUpdate = { data: UpdatePostDTO; id: string };

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
    @Args('data') input: CreatePostDTO,
  ): Observable<PostModel> {
    const post = this.client.send<PostModel, PostInputCreate>('create-post', {
      user_id: user.id,
      ...input,
    });

    this.pubSub.publish('postAdded', { postAdded: post });

    return post;
  }

  @Mutation(() => PostModel)
  public updatePost(
    @Args('data') input: UpdatePostDTO,
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostModel> {
    const post = this.client.send<PostModel, PostInputUpdate>('update-post', {
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
