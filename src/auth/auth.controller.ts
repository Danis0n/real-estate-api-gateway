import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
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
import { GetCurrentUserId } from '../decorators/get-current-user-id.decorator';
import { AuthGuard } from './guard/auth.guard';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';

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

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.authServiceClient.login(body);
  }

  @Post('refresh')
  private async auth(
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Observable<AuthResponse>> {
    return this.authServiceClient.auth({ refreshToken: refreshToken });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  private async logout(
    @GetCurrentUserId() at: string,
  ): Promise<Observable<LogoutResponse>> {
    return this.authServiceClient.logout({ accessToken: at });
  }
}
