import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@InputType()
export default class UserDTO {
  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @MinLength(6)
  readonly password: string;
}
