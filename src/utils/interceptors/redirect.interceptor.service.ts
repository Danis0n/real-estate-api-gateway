import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

interface RedirectResponse {
  status: string;
  error: string;
  message: string;
}
// TODO: implement redirection
@Injectable()
export class RedirectInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: RedirectResponse) => {
        console.log(data);
      }),
    );
  }
}
