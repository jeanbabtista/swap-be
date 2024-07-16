import { Module } from '@nestjs/common';
import { MediaService } from '@app/media/media.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Media } from '@app/media/entity/media.entity';
import { MediaController } from '@app/media/media.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Media])],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
