/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface User {
  id: string;
  email: string;
  siteLink: string;
  phone: string;
  userInfo: UserInfo | undefined;
  userLogin: UserLogin | undefined;
  imageUrl: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  birthData: string;
  description: string;
}

export interface UserLogin {
  login: string;
}

export interface FindOneUserRequest {
  id: string;
}

export interface FindOneUserResponse {
  user: User | undefined;
}

export interface FindAllUsersRequest {
}

export interface FindAllUsersResponse {
  users: User[];
}

export interface CreateUserRequest {
  email: string;
  password: string;
  login: string;
  phone: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface CreateUserResponse {
  status: string;
  user: User | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: CreateUserRequest): Observable<CreateUserResponse>;

  findAll(request: FindAllUsersRequest): Observable<FindAllUsersResponse>;

  findById(request: FindOneUserRequest): Observable<FindOneUserResponse>;
}

export interface UserServiceController {
  create(request: CreateUserRequest): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  findAll(
    request: FindAllUsersRequest,
  ): Promise<FindAllUsersResponse> | Observable<FindAllUsersResponse> | FindAllUsersResponse;

  findById(
    request: FindOneUserRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findAll", "findById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
