import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { Category } from './category.entity';
import { CategoryAttributeValue } from './category-attribute-value.entity';

@Entity()
export class CategoryAttribute extends UuidEntity {
  @Property()
  name: string;

  @Property()
  required = true; // if true, this attribute must be set for all products in this category

  @ManyToOne()
  category?: Category; // if null, it's a global attribute

  @OneToMany(() => CategoryAttributeValue, (value) => value.categoryAttribute)
  values = new Collection<CategoryAttributeValue>(this);
}
