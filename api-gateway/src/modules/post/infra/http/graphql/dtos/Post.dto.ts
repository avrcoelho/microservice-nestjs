import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Allow } from 'class-validator';

@InputType()
export default class PostDTO {
  @Field()
  @IsNotEmpty()
  readonly title: string;

  @Field()
  @IsNotEmpty()
  readonly content: string;

  @Field({ nullable: true })
  @Allow()
  readonly image?: string;
}
