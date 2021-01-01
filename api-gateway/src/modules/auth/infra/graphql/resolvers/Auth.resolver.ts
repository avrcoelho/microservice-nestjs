import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

import AuthDTO from '../dtos/Auth.dto';
import AuthModel from '../models/Auth.model';

@Resolver(() => AuthModel)
export default class AuthResolver {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Query(() => AuthModel)
  public async getUser() {
    return '';
  }

  @Mutation(() => AuthModel)
  public auth(@Args('data') input: AuthDTO): Observable<AuthModel> {
    const auth = this.client.send<AuthModel>('auth', input);

    return auth;
  }
}
