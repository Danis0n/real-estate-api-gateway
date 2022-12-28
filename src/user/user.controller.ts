import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ChangeCompanyInfoRequest,
  ChangeCompanyInfoResponse,
  ChangeInfoRequest,
  ChangeInfoResponse,
  CreateRoleRequest,
  CreateRoleResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteImageResponse,
  FindAllUsersResponse,
  FindOneUserResponse,
  UploadImageResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../utils/guard/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly userClient: ClientGrpc;

  public onModuleInit(): void {
    this.userServiceClient =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Post('create')
  private async create(
    @Body() dto: CreateUserRequest,
  ): Promise<Observable<CreateUserResponse>> {
    return this.userServiceClient.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get('get/all')
  private async findAll(
    @Req() request: Request,
  ): Promise<Observable<FindAllUsersResponse>> {
    console.log(request);
    return this.userServiceClient.findAll({});
  }

  @Get('get/:id')
  private async findById(
    @Param('id') id: string,
  ): Promise<Observable<FindOneUserResponse>> {
    return this.userServiceClient.findById({ id });
  }

  @Post('role/new')
  private async createRole(
    @Body() dto: CreateRoleRequest,
  ): Promise<Observable<CreateRoleResponse>> {
    return this.userServiceClient.createRole(dto);
  }

  @UseGuards(AuthGuard)
  @Post('image/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  private async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') uuid: string,
  ): Promise<Observable<UploadImageResponse>> {
    return this.userServiceClient.uploadImageToUser({
      originalName: file.originalname,
      fieldName: file.fieldname,
      mimetype: file.mimetype,
      buffer: file.buffer,
      size: file.size,
      uuid: uuid,
    });
  }

  @UseGuards(AuthGuard)
  @Post('image/delete/:id')
  private async deleteImage(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteImageResponse>> {
    return this.userServiceClient.deleteImageFromUser({ uuid });
  }

  @UseGuards(AuthGuard)
  @Post('change/info')
  private async changeInfo(
    @Body() dto: ChangeInfoRequest,
  ): Promise<Observable<ChangeInfoResponse>> {
    return this.userServiceClient.changeInfo(dto);
  }

  @UseGuards(AuthGuard)
  @Post('change/company-info/')
  private async changeCompanyInfo(
    @Body() dto: ChangeCompanyInfoRequest,
  ): Promise<Observable<ChangeCompanyInfoResponse>> {
    return this.userServiceClient.changeCompanyInfo(dto);
  }
}
