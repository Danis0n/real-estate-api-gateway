import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { POST_PACKAGE_NAME, POST_SERVICE_NAME } from './post.pb';
import { ImageMapper } from '../utils/mappers/image.mapper';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: POST_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: POST_PACKAGE_NAME,
          protoPath: 'node_modules/proto-config/proto/post.proto',
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [ImageMapper],
})
export class PostModule {}
