import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        res.cookie('refreshToken', data.refreshToken, {
          maxAge: 60 * 60 * 1000 * 24 * 60,
        });
        return data;
      }),
    );
  }
}
