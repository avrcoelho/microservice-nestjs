import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserRepository from './infra/typeorm/repositories/User.repository';
import CreateUserService from './services/CreateUser.service';
import GetUserService from './services/GetUser.service';
import BCryptHashProvider from './providers/hashProvider/implementations/BCryptHash.provider';
import UserController from './infra/eventPattern/controllers/User.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    CreateUserService,
    GetUserService,
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
  controllers: [UserController],
  exports: [
    TypeOrmModule.forFeature([UserRepository]),
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
})
export default class UserModule {}
