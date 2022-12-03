import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Put,
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

  @Put('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.authServiceClient.login(body);
  }

  @Get('auth')
  private async auth(): Promise<Observable<AuthResponse>> {
    return this.authServiceClient.auth({});
  }

  @Post('logout')
  private async logout(): Promise<Observable<LogoutResponse>> {
    return this.authServiceClient.logout({});
  }
}
