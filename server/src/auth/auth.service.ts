import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  login(loginAuthDto: LoginAuthDto) {
    // TODO: does the user exist in database?

    return {
      token: this.jwtService.sign({
        username: loginAuthDto.username,
      }),
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const res = await this.prismaService.user.findFirst({
      where: {
        username: createAuthDto.username,
      },
    });
    if (res) {
      return new HttpException('Username has already exist.', 400);
    }
    return this.prismaService.user.create({
      data: createAuthDto,
    });
  }
}
