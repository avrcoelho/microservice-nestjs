import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreatePostDTO {
  @Field()
  readonly title: string;

  @Field()
  readonly content: string;

  @Field({ nullable: true })
  readonly image?: string;
}
