import { Body, Controller, Post } from '@nestjs/common';
import { TokenDto } from '@app/auth/dto/token.dto';
import { AuthService } from '@app/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { token }: TokenDto) {
    await this.authService.register(token);
    return { message: 'successfully registered' };
  }
}
