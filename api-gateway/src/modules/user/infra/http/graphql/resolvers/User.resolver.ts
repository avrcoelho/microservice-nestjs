import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import JwtAuthGuard from '@shared/infra/http/guards/jwt-auth.guard';
import UserModel from '../models/User.model';
import UserDTO from '../dtos/User.dto';

interface IUser {
  id: string;
}

@Resolver(() => UserModel)
export default class UserResolver {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  public getUser(@Context('user') user: IUser): Observable<UserModel> {
    const userData = this.client.send<UserModel, string>('show-user', user.id);

    return userData;
  }

  @Mutation(() => UserModel)
  public createUser(@Args('data') input: UserDTO): Observable<UserModel> {
    const user = this.client.send<UserModel, UserDTO>('create-user', input);

    return user;
  }
}
