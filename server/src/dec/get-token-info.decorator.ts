import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetTokenInfo = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      return null;
    }
    return key && key in user ? user[key as keyof typeof user] : user;
  },
);
