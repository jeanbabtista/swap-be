import { Injectable } from '@nestjs/common';
import { Media } from '@app/media/entity/media.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MediaService {
  private readonly em: EntityManager;

  // TODO - inject file storage service with abstract file interface
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: EntityRepository<Media>,
    // private readonly fileStorageService: any,
  ) {
    this.em = mediaRepository.getEntityManager();
  }

  async uploadMedia(file: Express.Multer.File): Promise<Media> {
    // TODO - save file to storage
    // await this.fileStorageService.save(file);

    const media = new Media();
    media.key = 'key';
    media.filename = file.originalname;
    media.mimeType = file.mimetype;
    await this.em.persistAndFlush(media);

    return media;
  }
}
