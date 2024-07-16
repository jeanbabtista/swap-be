import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '@app/category/category.module';
import { UserModule } from '@app/user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '@app/product/entity/product.entity';
import { ProductActivity } from '@app/product/entity/product-activity.entity';
import { ProductAttribute } from '@app/product/entity/product-attribute.entity';
import { ProductMedia } from '@app/product/entity/product-media.entity';
import { MediaModule } from '@app/media/media.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Product, ProductActivity, ProductAttribute, ProductMedia]),
    UserModule,
    MediaModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
