/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "email";

export interface PasswordRestoreRequest {
  token: string;
  email: string;
}

export interface PasswordRestoreResponse {
  status: number;
  error: string;
}

export interface AccountConfirmRequest {
  token: string;
  email: string;
}

export interface AccountConfirmResponse {
  status: number;
  error: string;
}

export const EMAIL_PACKAGE_NAME = "email";

export interface EmailServiceClient {
  passwordRestore(request: PasswordRestoreRequest): Observable<PasswordRestoreResponse>;

  accountConfirm(request: AccountConfirmRequest): Observable<AccountConfirmResponse>;
}

export interface EmailServiceController {
  passwordRestore(
    request: PasswordRestoreRequest,
  ): Promise<PasswordRestoreResponse> | Observable<PasswordRestoreResponse> | PasswordRestoreResponse;

  accountConfirm(
    request: AccountConfirmRequest,
  ): Promise<AccountConfirmResponse> | Observable<AccountConfirmResponse> | AccountConfirmResponse;
}

export function EmailServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["passwordRestore", "accountConfirm"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("EmailService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("EmailService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMAIL_SERVICE_NAME = "EmailService";
