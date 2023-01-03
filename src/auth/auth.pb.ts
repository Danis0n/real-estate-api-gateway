/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface ConfirmRequest {
  token: string;
}

export interface ConfirmResponse {
  status: number;
  error: string;
  message: string;
}

export interface RedirectRequest {
  token: string;
}

export interface RedirectResponse {
  status: number;
  error: string;
  message: string;
}

export interface RestorePasswordRequest {
  username: string;
  email: string;
}

export interface RestorePasswordResponse {
  status: number;
  error: string;
}

export interface UpdatePasswordRequest {
  password: string;
  token: string;
}

export interface UpdatePasswordResponse {
  status: number;
  error: string;
}

export interface User {
  id: string;
  email: string;
  siteLink: string;
  phone: string;
  userInfo: UserInfo | undefined;
  userLogin: UserLogin | undefined;
  userUr: UserUrInfo | undefined;
  imageUrl: string;
  date: string;
  roles: Role[];
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  birthDate: string;
  description: string;
  locked: boolean;
  enabled: boolean;
}

export interface UserUrInfo {
  inn: string;
  description: string;
  link: string;
  address: string;
}

export interface UserLogin {
  login: string;
}

export interface Role {
  name: string;
}

export interface LogoutRequest {
  accessToken: string;
}

export interface LogoutResponse {
  status: number;
}

export interface AuthRequest {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User | undefined;
  error: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  login: string;
  phone: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  inn: string;
  link: string;
  role: string;
}

export interface RegisterResponse {
  status: number;
  error: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User | undefined;
  error: string;
  status: number;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string;
  roles: string[];
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  auth(request: AuthRequest): Observable<AuthResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  restorePassword(request: RestorePasswordRequest): Observable<RestorePasswordResponse>;

  redirectRestore(request: RedirectRequest): Observable<RedirectResponse>;

  updatePassword(request: UpdatePasswordRequest): Observable<UpdatePasswordResponse>;

  confirm(request: ConfirmRequest): Observable<ConfirmResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  auth(request: AuthRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  logout(request: LogoutRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  restorePassword(
    request: RestorePasswordRequest,
  ): Promise<RestorePasswordResponse> | Observable<RestorePasswordResponse> | RestorePasswordResponse;

  redirectRestore(
    request: RedirectRequest,
  ): Promise<RedirectResponse> | Observable<RedirectResponse> | RedirectResponse;

  updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;

  confirm(request: ConfirmRequest): Promise<ConfirmResponse> | Observable<ConfirmResponse> | ConfirmResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "register",
      "login",
      "auth",
      "validate",
      "logout",
      "restorePassword",
      "redirectRestore",
      "updatePassword",
      "confirm",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
