import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload, User } from '@asi-ecommerce/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import { addMonths } from 'date-fns';

@Injectable()
export class AuthService {
  private refreshTokenRegistry: { userId: number; expirationDate: Date; token: string }[] = [];

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    this.refreshTokenRegistry = this.refreshTokenRegistry.filter(row => row.userId !== user.id);
    this.refreshTokenRegistry.push({ userId: user.id, token: refreshToken, expirationDate: addMonths(Date.now(), 1) });

    return { accessToken, refreshToken, user };
  }

  async renewTokens(previousToken: string) {
    const entry = this.refreshTokenRegistry.find(row => row.token === previousToken);
    if (!entry) {
      throw new Error('TokenNotCorresponding');
    }
    const user = await this.userService.getUserById(entry.userId);
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    entry.token = refreshToken;

    return { accessToken, refreshToken };
  }

  private generateRefreshToken(length = 50): string {
    const allowedChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const getChar = () => allowedChar[Math.floor(Math.random() + allowedChar.length)];
    let token = '';
    for (let i = 0; i < length; i++) {
      token += getChar();
    }
    return token;
  }
}
