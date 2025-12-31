import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}
  encrypt(data: string): string {
    const hmac = crypto.createHmac(
      'sha256',
      this.configService.get<string>('CRYPTO_SECRET') ?? '',
    );
    return hmac.update(data).digest('hex');
  }

  verify(data: string, hash: string): boolean {
    return this.encrypt(data) === hash;
  }
}
