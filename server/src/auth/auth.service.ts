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

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: loginAuthDto.username,
      },
    });

    if (!user || user.password !== loginAuthDto.password) {
      throw new HttpException('Username or password is incorrect.', 400);
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
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
