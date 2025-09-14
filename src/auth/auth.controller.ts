import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
