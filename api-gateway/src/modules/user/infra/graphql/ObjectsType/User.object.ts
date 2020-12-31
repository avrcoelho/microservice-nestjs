import { Field, ID, ObjectType } from '@nestjs/graphql';

import PostObjectType from '@modules/post/infra/graphql/ObjectsType/Post.object';

@ObjectType()
export default class UserObjectType {
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

  @Field(() => [PostObjectType], { nullable: true })
  posts: PostObjectType[];
}
