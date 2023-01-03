import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
  UseInterceptors,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthResponse,
  AuthServiceClient,
  ConfirmResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RedirectResponse,
  RegisterRequest,
  RegisterResponse,
  RestorePasswordRequest,
  RestorePasswordResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetCurrentUserAt } from '../utils/decorators/get-current-user-id.decorator';
import { AuthGuard } from '../utils/guard/auth.guard';
import {
  AuthInterceptor,
  LogoutInterceptor,
} from '../utils/interceptors/auth.interceptor';
import { Request } from 'express';
import { RedirectInterceptor } from '../utils/interceptors/redirect.interceptor.service';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.authServiceClient.register(body);
  }

  @UseInterceptors(AuthInterceptor)
  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.authServiceClient.login(body);
  }

  @UseInterceptors(AuthInterceptor)
  @Post('refresh')
  private async auth(
    @Req() request: Request,
  ): Promise<Observable<AuthResponse>> {
    const refreshToken = request.cookies['refreshToken'];
    return this.authServiceClient.auth({ refreshToken: refreshToken });
  }

  @UseInterceptors(LogoutInterceptor)
  @UseGuards(AuthGuard)
  @Post('logout')
  private async logout(
    @GetCurrentUserAt() at: string,
  ): Promise<Observable<LogoutResponse>> {
    return this.authServiceClient.logout({ accessToken: at });
  }

  @Post('restore')
  private async restore(
    @Body() dto: RestorePasswordRequest,
  ): Promise<Observable<RestorePasswordResponse>> {
    return this.authServiceClient.restorePassword(dto);
  }

  @UseInterceptors(RedirectInterceptor)
  @Get('restore/:token')
  private async redirectRestore(
    @Param('token') token: string,
  ): Promise<Observable<RedirectResponse>> {
    return this.authServiceClient.redirectRestore({ token: token });
  }

  @UseInterceptors(RedirectInterceptor)
  @Get('confirm/:token')
  private async confirm(
    @Param('token') token: string,
  ): Promise<Observable<ConfirmResponse>> {
    return this.authServiceClient.confirm({ token: token });
  }

  @Post('password/update')
  private async update(
    @Body() dto: UpdatePasswordRequest,
  ): Promise<Observable<UpdatePasswordResponse>> {
    return this.authServiceClient.updatePassword(dto);
  }
}
