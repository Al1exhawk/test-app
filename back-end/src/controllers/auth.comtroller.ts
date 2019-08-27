import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { UserAuth } from 'src/models/user-auth.model';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: UserAuth): Promise<String> {
    const accessToken = await this.authService.login(user);
    return accessToken;
  }
}
