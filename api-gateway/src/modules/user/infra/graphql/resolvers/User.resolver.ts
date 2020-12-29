import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import UserObjectType from '../ObjectsType/User.object';
import UserInput from '../inputs/User.input';
import { Observable } from 'rxjs';

interface IUser {
  id: string;
}

@Resolver(() => UserObjectType)
export default class UserResolver {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserObjectType)
  public getUser(@Context('user') user: IUser): Observable<UserObjectType> {
    const userData = this.client.send<UserObjectType>('show-user', user.id);

    return userData;
  }

  @Mutation(() => UserObjectType)
  public createUser(
    @Args('data') input: UserInput,
  ): Observable<UserObjectType> {
    const user = this.client.send<UserObjectType>('create-user', input);

    return user;
  }
}
