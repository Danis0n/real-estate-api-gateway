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
  userUr: UserUrInfo | undefined;
  imageUrl: string;
  date: string;
  roles: Role[];
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  birthData: string;
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

export interface CreateRoleRequest {
  name: string;
}

export interface CreateRoleResponse {
  status: string;
  role: Role | undefined;
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
  link: string;
  inn: string;
}

export interface CreateUserResponse {
  status: string;
  user: User | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: CreateUserRequest): Observable<CreateUserResponse>;

  createUr(request: CreateUserRequest): Observable<CreateUserResponse>;

  findAll(request: FindAllUsersRequest): Observable<FindAllUsersResponse>;

  findById(request: FindOneUserRequest): Observable<FindOneUserResponse>;

  createRole(request: CreateRoleRequest): Observable<CreateRoleResponse>;
}

export interface UserServiceController {
  create(request: CreateUserRequest): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  createUr(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  findAll(
    request: FindAllUsersRequest,
  ): Promise<FindAllUsersResponse> | Observable<FindAllUsersResponse> | FindAllUsersResponse;

  findById(
    request: FindOneUserRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  createRole(
    request: CreateRoleRequest,
  ): Promise<CreateRoleResponse> | Observable<CreateRoleResponse> | CreateRoleResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "createUr", "findAll", "findById", "createRole"];
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
