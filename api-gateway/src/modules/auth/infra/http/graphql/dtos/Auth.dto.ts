import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export default class AuthDTO {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly password: string;
}
