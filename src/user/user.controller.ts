import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  CreateRoleRequest,
  CreateRoleResponse,
  CreateUserRequest,
  CreateUserResponse,
  FindAllUsersResponse,
  FindOneUserResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('user')
export class UserController implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly userClient: ClientGrpc;

  public onModuleInit(): void {
    this.userServiceClient =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  // @UsePipes(ValidationPipe)
  @Post('create')
  private async create(
    @Body() dto: CreateUserRequest,
  ): Promise<Observable<CreateUserResponse>> {
    return this.userServiceClient.create(dto);
  }

  @Post('create/ur')
  private async createUr(
    @Body() dto: CreateUserRequest,
  ): Promise<Observable<CreateUserResponse>> {
    return this.userServiceClient.createUr(dto);
  }

  @Get('get/all')
  private async findAll(): Promise<Observable<FindAllUsersResponse>> {
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
}
