import { Check, Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { User } from '@app/user/entity/user.entity';
import { PgConstraintEnum } from '@app/pg/enum/pg-constraint.enum';
import { MAX_CONDITION, MIN_CONDITION } from '@app/product/constant/condition';
import { ProductAttribute } from '@app/product/entity/product-attribute.entity';
import { ProductMedia } from '@app/product/entity/product-media.entity';

@Entity()
@Check({
  name: PgConstraintEnum.PRODUCT_NAME_NOT_EMPTY_CHECK,
  expression: `"name"::text <> ''::text`,
})
@Check({
  name: PgConstraintEnum.PRODUCT_SHORT_DESCRIPTION_NOT_EMPTY_CHECK,
  expression: `"short_description"::text <> ''::text`,
})
@Check({
  name: PgConstraintEnum.PRODUCT_CONDITION_CHECK,
  expression: `"condition"::smallint >= ${MIN_CONDITION} AND "condition"::smallint <= ${MAX_CONDITION}`,
})
export class Product extends UuidEntity {
  @Property({ type: 'varchar', length: 255 })
  name: string;

  @Property({ type: 'varchar', length: 255 })
  shortDescription: string;

  @Property({ type: 'text' })
  longDescription?: string;

  @Property({ type: 'smallint' })
  condition: number;

  @Property({ type: 'datetime' })
  createdAt = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'datetime' })
  deletedAt?: Date;

  @ManyToOne()
  user: User;

  @OneToMany(() => ProductAttribute, (attribute) => attribute.product)
  attributes = new Collection<ProductAttribute>(this);

  @OneToMany(() => ProductMedia, (media) => media.product)
  productMedia = new Collection<ProductMedia>(this);
}
