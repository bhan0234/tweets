import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: 'the_secret_key_for_token', 
    signOptions: { expiresIn: '1h' }, 
  }), ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
