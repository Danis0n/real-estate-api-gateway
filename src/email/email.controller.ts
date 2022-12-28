import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AccountConfirmRequest,
  AccountConfirmResponse,
  EMAIL_SERVICE_NAME,
  EmailServiceClient,
  PasswordRestoreRequest,
  PasswordRestoreResponse,
} from './email.pb';
import { Observable } from 'rxjs';

@Controller('email')
export class EmailController implements OnModuleInit {
  private emailServiceClient: EmailServiceClient;

  @Inject(EMAIL_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit(): void {
    this.emailServiceClient =
      this.client.getService<EmailServiceClient>(EMAIL_SERVICE_NAME);
  }

  private async passwordRestore(
    @Body() dto: PasswordRestoreRequest,
  ): Promise<Observable<PasswordRestoreResponse>> {
    return this.emailServiceClient.passwordRestore(dto);
  }

  private async accountConfirm(
    @Body() dto: AccountConfirmRequest,
  ): Promise<Observable<AccountConfirmResponse>> {
    return this.emailServiceClient.accountConfirm(dto);
  }
}
