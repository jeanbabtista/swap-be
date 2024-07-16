import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { Product } from '@app/product/entity/product.entity';
import { Media } from '@app/media/entity/media.entity';

@Entity()
export class ProductMedia extends UuidEntity {
  @ManyToOne()
  product: Product;

  @ManyToOne()
  media: Media;

  @Property({ type: 'smallint' })
  order: number;

  @Property()
  caption?: string;
}
