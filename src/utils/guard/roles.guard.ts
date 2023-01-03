import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { ValidateResponse } from '../../auth/auth.pb';

@Injectable()
export class RoleGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException({ message: 'Нет bearer токена' });
    }

    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException({ message: 'Нет JWT токена' });
    }

    const token: string = bearer[1];
    const { status, roles }: ValidateResponse = await this.authService.validate(
      token,
    );

    if (status != HttpStatus.OK) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    return roles.some((role) => requiredRoles.includes(role));
  }
}
