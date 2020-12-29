import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import jwtConfig from '@config/jwt';
import UserModule from '@modules/user/User.module';
import AuthService from './services/Auth.service';
import AUthController from './infra/eventPattern/controllers/Auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AUthController],
  providers: [AuthService],
})
export default class AuthModule {}
