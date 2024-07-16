import { BadRequestException, PipeTransform } from '@nestjs/common';

export class FileMaxSizeValidationPipe implements PipeTransform<Express.Multer.File, Express.Multer.File> {
  constructor(private readonly maxSize: number) {}

  transform(file: Express.Multer.File): Express.Multer.File {
    if (file.size > this.maxSize) throw new BadRequestException('File size is too large');
    return file;
  }
}
