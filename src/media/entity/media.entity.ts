import { Collection, Entity, OneToMany, Property } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { ProductMedia } from '@app/product/entity/product-media.entity';

@Entity()
export class Media extends UuidEntity {
  // Key for file storage service (AWS S3, Cloudinary, ...)
  @Property({ type: 'text' })
  key: string;

  @Property()
  filename: string;

  @Property()
  mimeType: string;

  @Property({ type: 'datetime' })
  timestamp = new Date();

  @OneToMany(() => ProductMedia, (productMedia) => productMedia.media)
  productMedia = new Collection<ProductMedia>(this);
}
