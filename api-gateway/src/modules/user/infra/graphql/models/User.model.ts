import { Field, ID, ObjectType } from '@nestjs/graphql';

import PostModel from '@modules/post/infra/graphql/models/Post.model';

@ObjectType()
export default class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field(() => [PostModel], { nullable: true })
  posts: PostModel[];
}
