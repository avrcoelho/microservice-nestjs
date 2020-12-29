import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import UserEntity from '../../typeorm/entities/User.entity';
import CreateUserService from '../../../services/CreateUser.service';
import GetUserService from '../../../services/GetUser.service';
import ICreateUserDTO from '../../../dtos/ICreateUser.dto';

interface IUser {
  id: string;
}

@Controller()
export default class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @MessagePattern('show-user')
  public async show(@Payload() userId: string): Promise<UserEntity> {
    const user = await this.getUserService.execute(userId);

    return user;
  }

  @MessagePattern('create-user')
  public async create(
    @Payload() userData: ICreateUserDTO,
  ): Promise<UserEntity> {
    const user = await this.createUserService.execute(userData);

    return user;
  }
}
