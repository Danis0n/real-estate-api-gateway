import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { RedirectResponse } from '../../auth/auth.pb';

@Injectable()
export class ConfirmInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: RedirectResponse) => {
        if (data.status == HttpStatus.OK) res.redirect('test');
        else {
          res.redirect('google.com');
        }
      }),
    );
  }
}
