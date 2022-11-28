import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from './user.pb';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: USER_PACKAGE_NAME,
          protoPath: 'node_modules/proto-config/proto/user.proto',
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
