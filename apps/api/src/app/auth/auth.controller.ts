import { Body, Controller, HttpCode, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '@asi-ecommerce/api-interfaces';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request) {
    return this.authService.login(<User>req.user);
  }

  @Public()
  @Post('renewTokens')
  @HttpCode(200)
  async renewTokens(@Body() body: { refreshToken: string }) {
    try {
      return await this.authService.renewTokens(body.refreshToken);
    } catch (e) {
      throw new UnauthorizedException('Refresh token unknow');
    }
  }
}
