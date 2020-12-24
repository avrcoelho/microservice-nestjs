import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import AuthInput from '../inputs/Auth.input';
import AuthResult from '../results/Auth.result';

@Resolver(() => AuthResult)
export default class AuthResolver {
  constructor() {}

  @Query(() => AuthResult)
  public async getUser() {
    return '';
  }

  @Mutation(() => AuthResult)
  public async auth(@Args('data') input: AuthInput): Promise<AuthResult> {
    return {
      token: 'jjiojio',
      id: 'jmjjop',
    };
  }
}
