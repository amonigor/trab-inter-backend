import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authCredentials: AuthCredentials) {
    return this.authService.login(authCredentials);
  }

  @Get('validate')
  validate(@Headers('Authorization') auth: string) {
    return this.authService.validate(auth);
  }
}
