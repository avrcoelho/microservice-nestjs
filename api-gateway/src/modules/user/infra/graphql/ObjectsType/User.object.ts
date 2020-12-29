import { Field, ID, ObjectType } from '@nestjs/graphql';

import PostObjectType from './Post.object';

@ObjectType()
export default class UserObjectType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => [PostObjectType])
  posts: PostObjectType[];
}
