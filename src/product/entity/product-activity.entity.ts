import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/postgresql';
import { Product } from './product.entity';
import { User } from '@app/user/entity/user.entity';
import { UuidEntity } from '@app/common/entity/uuid.entity';

@Entity()
@Unique({ properties: ['product', 'user'] })
export class ProductActivity extends UuidEntity {
  @Property()
  like: boolean;

  @Property({ type: 'timestamp' })
  timestamp = new Date();

  @ManyToOne()
  product: Product;

  @ManyToOne()
  user: User;
}
