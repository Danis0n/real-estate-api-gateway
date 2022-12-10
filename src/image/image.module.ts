import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IMAGE_PACKAGE_NAME, IMAGE_SERVICE_NAME } from './image.pb';

@Module({
  controllers: [ImageController],
  imports: [
    ClientsModule.register([
      {
        name: IMAGE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: IMAGE_PACKAGE_NAME,
          protoPath: 'node_modules/proto-config/proto/image.proto',
        },
      },
    ]),
  ],
})
export class ImageModule {}
