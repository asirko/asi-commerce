import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@asi-ecommerce/api-interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getData(@Req() req: Request): User {
    return req.user as User;
  }
}
