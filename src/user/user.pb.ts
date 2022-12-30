/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface CheckUserRequest {
  login: string;
  phone: string;
  email: string;
}

export interface CheckUserResponse {
  status: number;
  error: string;
}

export interface ChangeCompanyInfoRequest {
  description: string;
  link: string;
  address: string;
  uuid: string;
}

export interface ChangeCompanyInfoResponse {
  status: number;
  error: string;
}

export interface ChangeInfoRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  uuid: string;
}

export interface ChangeInfoResponse {
  status: number;
  error: string;
}

export interface ConfirmAccountRequest {
  uuid: string;
}

export interface ConfirmAccountResponse {
  status: number;
  error: string;
}

export interface ChangePasswordRequest {
  password: string;
  uuid: string;
}

export interface ChangePasswordResponse {
  status: number;
  error: string;
}

export interface DeleteImageRequest {
  uuid: string;
}

export interface DeleteImageResponse {
  status: number;
  error: string;
}

export interface UploadImageRequest {
  buffer: Uint8Array;
  fieldName: string;
  originalName: string;
  mimetype: string;
  size: number;
  uuid: string;
}

export interface UploadImageResponse {
  status: number;
  error: string;
  uuid: string;
}

export interface GetHashedPasswordResponse {
  password: string;
}

export interface FindOneUserLoginRequest {
  login: string;
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
  status: number;
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
  status: number;
  user: User | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: CreateUserRequest): Observable<CreateUserResponse>;

  findAll(request: FindAllUsersRequest): Observable<FindAllUsersResponse>;

  findById(request: FindOneUserRequest): Observable<FindOneUserResponse>;

  createRole(request: CreateRoleRequest): Observable<CreateRoleResponse>;

  findByLogin(request: FindOneUserLoginRequest): Observable<FindOneUserResponse>;

  getHashedPassword(request: FindOneUserLoginRequest): Observable<GetHashedPasswordResponse>;

  uploadImageToUser(request: UploadImageRequest): Observable<UploadImageResponse>;

  deleteImageFromUser(request: DeleteImageRequest): Observable<DeleteImageResponse>;

  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse>;

  confirmAccount(request: ConfirmAccountRequest): Observable<ConfirmAccountResponse>;

  changeInfo(request: ChangeInfoRequest): Observable<ChangeInfoResponse>;

  changeCompanyInfo(request: ChangeCompanyInfoRequest): Observable<ChangeCompanyInfoResponse>;

  checkUser(request: CheckUserRequest): Observable<CheckUserResponse>;
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

  getHashedPassword(
    request: FindOneUserLoginRequest,
  ): Promise<GetHashedPasswordResponse> | Observable<GetHashedPasswordResponse> | GetHashedPasswordResponse;

  uploadImageToUser(
    request: UploadImageRequest,
  ): Promise<UploadImageResponse> | Observable<UploadImageResponse> | UploadImageResponse;

  deleteImageFromUser(
    request: DeleteImageRequest,
  ): Promise<DeleteImageResponse> | Observable<DeleteImageResponse> | DeleteImageResponse;

  changePassword(
    request: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> | Observable<ChangePasswordResponse> | ChangePasswordResponse;

  confirmAccount(
    request: ConfirmAccountRequest,
  ): Promise<ConfirmAccountResponse> | Observable<ConfirmAccountResponse> | ConfirmAccountResponse;

  changeInfo(
    request: ChangeInfoRequest,
  ): Promise<ChangeInfoResponse> | Observable<ChangeInfoResponse> | ChangeInfoResponse;

  changeCompanyInfo(
    request: ChangeCompanyInfoRequest,
  ): Promise<ChangeCompanyInfoResponse> | Observable<ChangeCompanyInfoResponse> | ChangeCompanyInfoResponse;

  checkUser(request: CheckUserRequest): Promise<CheckUserResponse> | Observable<CheckUserResponse> | CheckUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findAll",
      "findById",
      "createRole",
      "findByLogin",
      "getHashedPassword",
      "uploadImageToUser",
      "deleteImageFromUser",
      "changePassword",
      "confirmAccount",
      "changeInfo",
      "changeCompanyInfo",
      "checkUser",
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
