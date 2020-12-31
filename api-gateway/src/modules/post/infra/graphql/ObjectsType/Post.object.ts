import { Field, ID, ObjectType } from '@nestjs/graphql';

import UserObjectType from '@modules/user/infra/graphql/ObjectsType/User.object';

@ObjectType()
export default class PostObjectType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  user_id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  image: string | null;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field(() => UserObjectType, { nullable: true })
  user: UserObjectType;

  @Field(() => String, { nullable: true })
  get image_url() {
    return this.image ? `${process.env.APP_API_URL}/files/${this.image}` : null;
  }
}
