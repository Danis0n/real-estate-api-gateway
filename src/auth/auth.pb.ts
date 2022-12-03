/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

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
}

export interface LogoutResponse {
  status: number;
}

export interface AuthRequest {
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User | undefined;
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
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User | undefined;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
  roles: string[];
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  auth(request: AuthRequest): Observable<AuthResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  auth(request: AuthRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  logout(request: LogoutRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "auth", "validate", "logout"];
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
