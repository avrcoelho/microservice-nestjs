import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UpdatePostInput {
  @Field()
  readonly title: string;

  @Field()
  readonly content: string;

  @Field({ nullable: true })
  readonly image?: string;
}
