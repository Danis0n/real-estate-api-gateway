import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthResponse,
  AuthServiceClient,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetCurrentUserAt } from '../utils/decorators/get-current-user-id.decorator';
import { AuthGuard } from '../utils/guard/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { Request } from 'express';

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

  @UseGuards(AuthGuard)
  @Post('logout')
  private async logout(
    @GetCurrentUserAt() at: string,
  ): Promise<Observable<LogoutResponse>> {
    return this.authServiceClient.logout({ accessToken: at });
  }
}
