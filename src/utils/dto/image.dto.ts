import { ImageCreate } from '../../post/post.pb';

export class ImageDto implements ImageCreate {
  buffer: Uint8Array;
  encoding: string;
  fieldName: string;
  mimetype: string;
  originalName: string;
  size: number;
}
