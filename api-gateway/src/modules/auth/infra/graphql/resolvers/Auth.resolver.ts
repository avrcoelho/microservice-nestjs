import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

import AuthInput from '../inputs/Auth.input';
import AuthObjectType from '../ObjectsType/Auth.object';

@Resolver(() => AuthObjectType)
export default class AuthResolver {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Query(() => AuthObjectType)
  public async getUser() {
    return '';
  }

  @Mutation(() => AuthObjectType)
  public auth(@Args('data') input: AuthInput): Observable<AuthObjectType> {
    const auth = this.client.send<AuthObjectType>('auth', input);

    return auth;
  }
}
