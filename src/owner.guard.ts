import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }

    // 원래 Basic auth는 base64 encoding이 되어야 함.
    // 하지만 여기서는 간단하게 구현하기 위해 생략함.
    const owner = authHeader.split(' ')[1];
    if (!owner) {
      return false;
    }

    if (owner.length > 100) {
      return false;
    }

    request['owner'] = owner;

    return true;
  }
}
