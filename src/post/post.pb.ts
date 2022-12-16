/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "post";

export interface ImageCreate {
  fieldName: string;
  originalName: string;
  mimetype: string;
  buffer: Uint8Array;
  size: number;
}

export interface CreatePostRequest {
  name: string;
  price: string;
  floorHeight: string;
  maxFloor: number;
  currentFloor: number;
  houseType: string;
  isParking: boolean;
  isBalcony: boolean;
  isRenovation: boolean;
  roomQuantity: string;
  dimensions: string;
  kitchenDimensions: string;
  livingDimensions: string;
  buildAt: string;
  description: string;
  city: string;
  location: string;
  deal: string;
  type: string;
  userId: string;
  images: ImageCreate[];
}

export interface CreatePostResponse {
  status: string;
  error: string;
  post: Post | undefined;
}

export interface FindAllPostRequest {
}

export interface FindAllPostResponse {
  posts: Post[];
}

export interface FindOnePostRequest {
  uuid: string;
}

export interface FindOnePostResponse {
  status: string;
  error: string;
  post: Post | undefined;
}

export interface Post {
  postUuid: string;
  userId: string;
  name: string;
  dateOfCreation: string;
  location: string;
  city: string;
  deal: string;
  type: string;
  info: PostInfo | undefined;
  images: Image[];
}

export interface PostInfo {
  infoId: string;
  price: number;
  floorHeight: string;
  maxFloor: number;
  currentFloor: number;
  houseType: string;
  isParking: boolean;
  isBalcony: boolean;
  isRenovation: boolean;
  roomQuantity: string;
  dimensions: string;
  kitchenDimensions: string;
  livingDimensions: string;
  buildAt: string;
  description: string;
}

export interface Image {
  imageUuid: string;
  date: string;
}

export const POST_PACKAGE_NAME = "post";

export interface PostServiceClient {
  create(request: CreatePostRequest): Observable<CreatePostResponse>;

  findOne(request: FindOnePostRequest): Observable<FindOnePostResponse>;

  findAll(request: FindAllPostRequest): Observable<FindAllPostResponse>;
}

export interface PostServiceController {
  create(request: CreatePostRequest): Promise<CreatePostResponse> | Observable<CreatePostResponse> | CreatePostResponse;

  findOne(
    request: FindOnePostRequest,
  ): Promise<FindOnePostResponse> | Observable<FindOnePostResponse> | FindOnePostResponse;

  findAll(
    request: FindAllPostRequest,
  ): Promise<FindAllPostResponse> | Observable<FindAllPostResponse> | FindAllPostResponse;
}

export function PostServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findOne", "findAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PostService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PostService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const POST_SERVICE_NAME = "PostService";
