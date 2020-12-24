import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import jwtConfig from '@config/jwt';
import AuthResolver from './infra/graphql/resolvers/Auth.resolver';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthResolver, JwtStrategy],
})
export default class AuthModule {}
