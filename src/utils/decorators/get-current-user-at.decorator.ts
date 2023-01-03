import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetCurrentUserAt = createParamDecorator(
  async (_: undefined, context: ExecutionContext): Promise<string> => {
    const req = context.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];
    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }
    return bearer[1];
  },
);
