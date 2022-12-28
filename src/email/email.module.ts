import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EMAIL_PACKAGE_NAME, EMAIL_SERVICE_NAME } from './email.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EMAIL_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50055',
          package: EMAIL_PACKAGE_NAME,
          protoPath: 'node_modules/proto-config/proto/email.proto',
        },
      },
    ]),
  ],
  controllers: [EmailController],
})
export class EmailModule {}
