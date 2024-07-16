import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { CategoryAttribute } from './category-attribute.entity';
import { ProductAttribute } from '@app/product/entity/product-attribute.entity';

@Entity()
export class CategoryAttributeValue extends UuidEntity {
  @Property()
  value: string;

  @Property()
  color?: string;

  @ManyToOne()
  categoryAttribute: CategoryAttribute;

  @OneToMany(() => ProductAttribute, (attribute) => attribute.value)
  productAttributes = new Collection<ProductAttribute>(this);
}
