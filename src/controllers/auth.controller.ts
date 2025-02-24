import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../config/auth/auth.service';
import { LoginDto } from '@config/auth/interface/login.dto';
import { RegisterDto } from '@config/auth/interface/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
