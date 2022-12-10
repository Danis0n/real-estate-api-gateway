import {
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  IMAGE_SERVICE_NAME,
  ImageServiceClient,
  ImageUserResponse,
} from './image.pb';

@Controller('image')
export class ImageController implements OnModuleInit {
  private imageServiceClient: ImageServiceClient;

  @Inject(IMAGE_SERVICE_NAME)
  private readonly imageClient: ClientGrpc;

  public onModuleInit(): void {
    this.imageServiceClient =
      this.imageClient.getService<ImageServiceClient>(IMAGE_SERVICE_NAME);
  }

  @Post('user/upload')
  @UseInterceptors(FileInterceptor('file'))
  private async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<ImageUserResponse>> {
    console.log(file);
    return this.imageServiceClient.imageUploadUser({
      buffer: file.buffer,
      fieldName: file.fieldname,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
  }
}
