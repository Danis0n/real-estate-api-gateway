import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { REFRESH_TOKEN_LIVE_TIME } from '../config/constants';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        res.cookie('refreshToken', data.refreshToken, {
          maxAge: REFRESH_TOKEN_LIVE_TIME,
        });
        return data;
      }),
    );
  }
}
