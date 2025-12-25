import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      username: string;
    };
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Token is missing or invalid');
    }
    try {
      const res = this.jwtService.verify<{ id: number; username: string }>(
        token,
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      );
      req.user = res;
    } catch (err) {
      console.error('JWT verification failed:', err);
      throw new HttpException('Login has expired. Please log in again.', 401);
    }
    return true;
  }
}
