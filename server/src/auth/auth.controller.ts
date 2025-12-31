import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GetTokenInfo } from 'src/dec/get-token-info.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  updatePassword(
    @GetTokenInfo('id') id: number,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.updatePassword(+id, updateAuthDto);
  }
}
