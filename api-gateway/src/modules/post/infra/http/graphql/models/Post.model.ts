import { Field, ID, ObjectType } from '@nestjs/graphql';

import UserModel from '@modules/user/infra/http/graphql/models/User.model';

@ObjectType()
export default class PostModel {
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

  @Field(() => UserModel, { nullable: true })
  user: UserModel;

  @Field(() => String, { nullable: true })
  get image_url() {
    return this.image ? `${process.env.APP_API_URL}/files/${this.image}` : null;
  }
}
