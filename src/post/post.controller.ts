import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreatePostRequest,
  CreatePostResponse,
  FindAllPostResponse,
  FindOnePostResponse,
  LockPostAdminStateRequest,
  LockPostStateRequest,
  POST_SERVICE_NAME,
  PostServiceClient,
  UpdateImagesRequest,
  UpdateImagesResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from './post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '../utils/guard/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageMapper } from '../utils/mappers/image.mapper';
import { Roles } from '../utils/decorators/role.decorator';
import { RoleGuard } from '../utils/guard/roles.guard';
import { LockStateResponse } from '../user/user.pb';

@Controller('post')
export class PostController implements OnModuleInit {
  private postServiceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly postClient: ClientGrpc;

  @Inject(ImageMapper)
  private readonly imageMapper: ImageMapper;

  public onModuleInit(): void {
    this.postServiceClient =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  private async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreatePostRequest,
  ): Promise<Observable<CreatePostResponse>> {
    dto.images = this.imageMapper.mapToArrayImageCreate(files);
    return this.postServiceClient.create(dto);
  }

  @Get('get/:id')
  private async findById(
    @Param('id') UUID: string,
  ): Promise<Observable<FindOnePostResponse>> {
    return this.postServiceClient.findOne({ UUID });
  }

  @Get('get-all')
  private async findAll(): Promise<Observable<FindAllPostResponse>> {
    return this.postServiceClient.findAll({});
  }

  @Post('update')
  private async update(
    @Body() dto: UpdatePostRequest,
  ): Promise<Observable<UpdatePostResponse>> {
    return this.postServiceClient.updatePost(dto);
  }

  @Post('update/images')
  @UseInterceptors(FilesInterceptor('files'))
  private async updateImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: UpdateImagesRequest,
  ): Promise<Observable<UpdateImagesResponse>> {
    dto.createImages = this.imageMapper.mapToArrayImageCreate(files);
    return this.postServiceClient.updateImages(dto);
  }

  @UseGuards(AuthGuard)
  @Post('state/lock')
  private async updateLockOne(
    @Body() dto: LockPostStateRequest,
  ): Promise<Observable<LockStateResponse>> {
    return this.postServiceClient.updateLockPost(dto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('state/lock/admin')
  private async updateLockOneAdmin(
    @Body() dto: LockPostAdminStateRequest,
  ): Promise<Observable<LockStateResponse>> {
    return this.postServiceClient.updateLockPostAdmin(dto);
  }
}
