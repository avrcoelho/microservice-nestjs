import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class AuthObjectType {
  @Field()
  readonly token: string;

  @Field()
  readonly id: string;
}
