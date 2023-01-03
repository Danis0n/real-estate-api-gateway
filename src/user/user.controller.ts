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
  CreateRoleRequest,
  CreateRoleResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteImageResponse,
  FindAllUsersResponse,
  FindOneUserResponse,
  LockStateRequest,
  LockStateResponse,
  UpdateCompanyInfoRequest,
  UpdateCompanyInfoResponse,
  UpdateInfoRequest,
  UpdateInfoResponse,
  UploadImageResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../utils/guard/auth.guard';
import { Request } from 'express';
import { RoleGuard } from '../utils/guard/roles.guard';
import { Roles } from '../utils/decorators/role.decorator';

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
      UUID: uuid,
    });
  }

  @UseGuards(AuthGuard)
  @Post('image/delete/:id')
  private async deleteImage(
    @Param('id') UUID: string,
  ): Promise<Observable<DeleteImageResponse>> {
    return this.userServiceClient.deleteImageFromUser({ UUID });
  }

  @UseGuards(AuthGuard)
  @Post('update/info')
  private async changeInfo(
    @Body() dto: UpdateInfoRequest,
  ): Promise<Observable<UpdateInfoResponse>> {
    return this.userServiceClient.updateInfo(dto);
  }

  @UseGuards(AuthGuard)
  @Post('update/company-info/')
  private async changeCompanyInfo(
    @Body() dto: UpdateCompanyInfoRequest,
  ): Promise<Observable<UpdateCompanyInfoResponse>> {
    return this.userServiceClient.updateCompanyInfo(dto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('state/lock')
  private async updateLockOne(
    @Body() dto: LockStateRequest,
  ): Promise<Observable<LockStateResponse>> {
    return this.userServiceClient.updateUserLock(dto);
  }
}
