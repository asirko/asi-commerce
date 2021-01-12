import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
