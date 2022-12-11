/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "image";

export interface ImageDeleteRequest {
  uuid: string;
}

export interface ImageDeleteResponse {
  status: string;
  error: string;
}

export interface ImageUserRequest {
  buffer: Uint8Array;
  fieldName: string;
  originalName: string;
  mimetype: string;
  size: number;
}

export interface ImageUserResponse {
  status: string;
  error: string;
  uuid: string;
}

export interface ImagePostRequest {
  buffer: Uint8Array;
  fieldName: string;
  originalName: string;
  mimetype: string;
  size: number;
}

export interface ImagePostResponse {
  status: string;
  error: string;
  uuid: string;
}

export interface ImageViewRequest {
  uuid: string;
}

export interface ImageViewResponse {
  buffer: string;
}

export const IMAGE_PACKAGE_NAME = "image";

export interface ImageServiceClient {
  imageUploadUser(request: ImageUserRequest): Observable<ImageUserResponse>;

  imageUploadPost(request: ImagePostRequest): Observable<ImagePostResponse>;

  imageView(request: ImageViewRequest): Observable<ImageViewResponse>;

  imageDelete(request: ImageDeleteRequest): Observable<ImageDeleteResponse>;
}

export interface ImageServiceController {
  imageUploadUser(
    request: ImageUserRequest,
  ): Promise<ImageUserResponse> | Observable<ImageUserResponse> | ImageUserResponse;

  imageUploadPost(
    request: ImagePostRequest,
  ): Promise<ImagePostResponse> | Observable<ImagePostResponse> | ImagePostResponse;

  imageView(request: ImageViewRequest): Promise<ImageViewResponse> | Observable<ImageViewResponse> | ImageViewResponse;

  imageDelete(
    request: ImageDeleteRequest,
  ): Promise<ImageDeleteResponse> | Observable<ImageDeleteResponse> | ImageDeleteResponse;
}

export function ImageServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["imageUploadUser", "imageUploadPost", "imageView", "imageDelete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ImageService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ImageService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const IMAGE_SERVICE_NAME = "ImageService";
