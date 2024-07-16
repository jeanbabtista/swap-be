import { Check, Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/postgresql';
import { UuidEntity } from '@app/common/entity/uuid.entity';
import { PgConstraintEnum } from '@app/pg/enum/pg-constraint.enum';
import { Product } from '@app/product/entity/product.entity';

@Entity()
@Unique({
  name: PgConstraintEnum.USER_FIREBASE_UID_UNIQUE,
  properties: ['firebaseId'],
})
@Unique({ name: PgConstraintEnum.USER_EMAIL_UNIQUE, properties: ['email'] })
@Check({
  name: PgConstraintEnum.USER_USERNAME_NOT_EMPTY_CHECK,
  expression: `"username"::text <> ''::text`,
})
@Check({
  name: PgConstraintEnum.USER_EMAIL_NOT_EMPTY_CHECK,
  expression: `"email"::text <> ''::text`,
})
@Check({
  name: PgConstraintEnum.USER_EMAIL_CHECK,
  expression: `"email" ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'`,
})
export class User extends UuidEntity {
  @Property({ type: 'text' })
  firebaseId: string;

  @Property({ type: 'text' })
  email: string;

  @Property({ type: 'datetime' })
  createdAt = new Date();

  @Property({ length: 100 })
  username?: string;

  @Property({ type: 'text' })
  bio?: string;

  @OneToMany(() => Product, (product) => product.user)
  products = new Collection<Product>(this);
}
