/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "image";

export interface ImageDeleteRequest {
  uuid: string;
}

export interface ImageDeleteResponse {
  status: number;
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
  status: number;
  error: string;
  uuid: string;
}

export interface ImageCreate {
  fieldName: string;
  originalName: string;
  mimetype: string;
  buffer: Uint8Array;
  size: number;
}

export interface ImagePostRequest {
  images: ImageCreate[];
  uuid: string;
}

export interface ImagePostResponse {
  status: number;
  error: string;
  uuid: string;
  imagesUuids: string[];
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
