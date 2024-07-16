import { Collection, Entity, OneToMany, Property } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { CategoryAttribute } from './category-attribute.entity';

@Entity()
export class Category extends UuidEntity {
  @Property()
  name: string;

  @OneToMany(() => CategoryAttribute, (attribute) => attribute.category)
  attributes = new Collection<CategoryAttribute>(this);
}
