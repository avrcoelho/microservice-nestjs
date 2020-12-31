import { UseGuards, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context, ID } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import CreatePostInput from '../inputs/CreatePost.input';
import UpdatePostInput from '../inputs/UpdatePost.input';
import PostObjectType from '../ObjectsType/Post.object';

interface IUser {
  id: string;
}

type PostInputCreate = CreatePostInput & { user_id: string };
type PostInputUpdate = { data: UpdatePostInput; id: string };

@UseGuards(JwtAuthGuard)
@Resolver(() => PostObjectType)
export default class PostResolver {
  constructor(
    @Inject('POST_SERVICE') private readonly client: ClientProxy,

    @Inject('PubSub')
    private pubSub: PubSub,
  ) {}

  @Query(() => [PostObjectType])
  public getUserPosts(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostObjectType[]> {
    const posts = this.client.send<PostObjectType[], string>('user-posts', id);

    return posts;
  }

  @Query(() => PostObjectType)
  public getPost(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostObjectType> {
    const post = this.client.send<PostObjectType, string>('show-post', id);

    return post;
  }

  @Mutation(() => PostObjectType)
  public createPost(
    @Context('user') user: IUser,
    @Args('data') input: CreatePostInput,
  ): Observable<PostObjectType> {
    const post = this.client.send<PostObjectType, PostInputCreate>(
      'create-post',
      {
        user_id: user.id,
        ...input,
      },
    );

    this.pubSub.publish('postAdded', { postAdded: post });

    return post;
  }

  @Mutation(() => PostObjectType)
  public updatePost(
    @Args('data') input: UpdatePostInput,
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<PostObjectType> {
    const post = this.client.send<PostObjectType, PostInputUpdate>(
      'update-post',
      { data: input, id },
    );

    this.pubSub.publish('postUpdated', { postUpdated: post });

    return post;
  }

  @Mutation(() => Boolean)
  public deletePost(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Observable<boolean> {
    const post = this.client.send<PostObjectType, string>('delete-post', id);

    this.pubSub.publish('postDelected', { postDelected: post });

    return;
  }
}
