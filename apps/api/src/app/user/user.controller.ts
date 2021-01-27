import { Controller, Get, Req } from '@nestjs/common';
import { User } from '@asi-ecommerce/api-interfaces';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Get('me')
  getData(@Req() req: Request): User {
    return req.user as User;
  }
}
