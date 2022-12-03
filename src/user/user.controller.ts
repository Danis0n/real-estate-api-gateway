import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
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

  @Get('get/login/:id')
  private async findByLogin(
    @Param('id') login: string,
  ): Promise<Observable<FindOneUserResponse>> {
    return this.userServiceClient.findByLogin({ login });
  }

  @Get('get/email/:id')
  private async findByEmail(
    @Param('id') email: string,
  ): Promise<Observable<FindOneUserResponse>> {
    return this.userServiceClient.findByEmail({ email });
  }

  @Get('get/phone/:id')
  private async findByPhone(
    @Param('id') phone: string,
  ): Promise<Observable<FindOneUserResponse>> {
    return this.userServiceClient.findByPhone({ phone });
  }

  @Get('get/inn/:id')
  private async findByInn(
    @Param('id') inn: string,
  ): Promise<Observable<FindOneUserResponse>> {
    return this.userServiceClient.findByInn({ inn });
  }

  @Post('role/new')
  private async createRole(
    @Body() dto: CreateRoleRequest,
  ): Promise<Observable<CreateRoleResponse>> {
    return this.userServiceClient.createRole(dto);
  }
}