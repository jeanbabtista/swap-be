import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { FileMimeTypeValidationPipe } from '@app/media/pipe/file-mime-type-validation.pipe';
import { FileMimeTypeEnum } from '@app/media/enum/file-mime-type.enum';
import { FileMaxSizeValidationPipe } from '@app/media/pipe/file-max-size-validation.pipe';
import { FILE_SIZE_5_MB } from '@app/common/constant/file-size';
import { Media } from '@app/media/entity/media.entity';

@Controller('media')
@ApiTags('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'Media uploaded successfully' })
  @ApiUnprocessableEntityResponse({ description: 'File type is not allowed' })
  @ApiBadRequestResponse({ description: 'File size is too large' })
  async upload(
    @UploadedFile(
      new FileMimeTypeValidationPipe([FileMimeTypeEnum.PNG, FileMimeTypeEnum.JPEG, FileMimeTypeEnum.WEBP]),
      new FileMaxSizeValidationPipe(FILE_SIZE_5_MB),
    )
    file: Express.Multer.File,
  ): Promise<Media> {
    return await this.mediaService.uploadMedia(file);
  }
}
