import { Entity, ManyToOne } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { Product } from './product.entity';
import { CategoryAttributeValue } from '@app/category/entity/category-attribute-value.entity';

@Entity()
export class ProductAttribute extends UuidEntity {
  @ManyToOne()
  product: Product;

  @ManyToOne()
  value: CategoryAttributeValue;
}
