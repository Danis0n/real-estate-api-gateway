import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ValidateResponse } from '../auth.pb';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }
    const token: string = bearer[1];
    const { status, error }: ValidateResponse = await this.authService.validate(
      token,
    );
    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
    return true;
  }
}
