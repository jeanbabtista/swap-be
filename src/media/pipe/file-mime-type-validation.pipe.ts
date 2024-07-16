import { PipeTransform, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileMimeTypeEnum } from '@app/media/enum/file-mime-type.enum';

export class FileMimeTypeValidationPipe implements PipeTransform<Express.Multer.File, Express.Multer.File> {
  constructor(private readonly mimeTypes: FileMimeTypeEnum[]) {}

  transform(file: Express.Multer.File): Express.Multer.File {
    const isValid = this.mimeTypes.includes(file.mimetype as FileMimeTypeEnum);
    if (!isValid)
      throw new UnsupportedMediaTypeException(
        `File type ${file.mimetype} is not allowed. Allowed file types are: ${this.mimeTypes.join(', ')}`,
      );

    return file;
  }
}
