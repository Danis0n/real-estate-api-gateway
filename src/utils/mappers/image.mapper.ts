import { ImageDto } from '../dto/image.dto';

export class ImageMapper {
  public mapToImageCreate(file: Express.Multer.File): ImageDto {
    const image: ImageDto = new ImageDto();
    image.size = file.size;
    image.buffer = file.buffer;
    image.originalName = file.originalname;
    image.mimetype = file.mimetype;
    image.fieldName = file.fieldname;
    return image;
  }

  public mapToArrayImageCreate(files: Array<Express.Multer.File>): ImageDto[] {
    const images: ImageDto[] = [];

    files.forEach((file) => {
      images.push(this.mapToImageCreate(file));
    });
    return images;
  }
}
