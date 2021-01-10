import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@asi-ecommerce/api-interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getData(): User {
    return this.userService.getMe();
  }
}
