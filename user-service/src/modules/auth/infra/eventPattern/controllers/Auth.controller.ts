import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import IAuthDTO from '../../../dtos/IAuth.dto';
import IAuthModel from '../../../models/IAuth.model';
import AuthService from '../../../services/Auth.service';

@Controller()
export default class AUthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth')
  public async auth(@Payload() data: IAuthDTO): Promise<IAuthModel> {
    const auth = await this.authService.execute(data);

    return auth;
  }
}
