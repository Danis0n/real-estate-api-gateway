/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface UploadImageRequest {
  buffer: Uint8Array;
  fieldName: string;
  originalName: string;
  mimetype: string;
  size: number;
}

export interface UploadImageResponse {
  status: string;
  error: string;
  uuid: string;
}

export interface GetHashedPasswordResponse {
  password: string;
}

export interface FindOneUserLoginRequest {
  login: string;
}

export interface FindOneUserEmailRequest {
  email: string;
}

export interface FindOneUserPhoneRequest {
  phone: string;
}

export interface FindOneUserInnRequest {
  inn: string;
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

  findAll(request: FindAllUsersRequest): Observable<FindAllUsersResponse>;

  findById(request: FindOneUserRequest): Observable<FindOneUserResponse>;

  createRole(request: CreateRoleRequest): Observable<CreateRoleResponse>;

  findByLogin(request: FindOneUserLoginRequest): Observable<FindOneUserResponse>;

  findByEmail(request: FindOneUserEmailRequest): Observable<FindOneUserResponse>;

  findByPhone(request: FindOneUserPhoneRequest): Observable<FindOneUserResponse>;

  findByInn(request: FindOneUserInnRequest): Observable<FindOneUserResponse>;

  getHashedPassword(request: FindOneUserLoginRequest): Observable<GetHashedPasswordResponse>;

  uploadImageToUser(request: UploadImageRequest): Observable<UploadImageResponse>;
}

export interface UserServiceController {
  create(request: CreateUserRequest): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  findAll(
    request: FindAllUsersRequest,
  ): Promise<FindAllUsersResponse> | Observable<FindAllUsersResponse> | FindAllUsersResponse;

  findById(
    request: FindOneUserRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  createRole(
    request: CreateRoleRequest,
  ): Promise<CreateRoleResponse> | Observable<CreateRoleResponse> | CreateRoleResponse;

  findByLogin(
    request: FindOneUserLoginRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  findByEmail(
    request: FindOneUserEmailRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  findByPhone(
    request: FindOneUserPhoneRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  findByInn(
    request: FindOneUserInnRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  getHashedPassword(
    request: FindOneUserLoginRequest,
  ): Promise<GetHashedPasswordResponse> | Observable<GetHashedPasswordResponse> | GetHashedPasswordResponse;

  uploadImageToUser(
    request: UploadImageRequest,
  ): Promise<UploadImageResponse> | Observable<UploadImageResponse> | UploadImageResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findAll",
      "findById",
      "createRole",
      "findByLogin",
      "findByEmail",
      "findByPhone",
      "findByInn",
      "getHashedPassword",
      "uploadImageToUser",
    ];
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
