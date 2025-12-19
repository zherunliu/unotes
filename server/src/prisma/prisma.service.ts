import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
// import { env } from 'prisma/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaMariaDb(
      // env('DATABASE_URL')
      configService.get<string>('DATABASE_URL') ?? '',
    );
    super({ adapter });
  }
}
