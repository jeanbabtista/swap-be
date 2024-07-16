import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from '@app/category/entity/category.entity';
import { CategoryAttribute } from '@app/category/entity/category-attribute.entity';
import { CategoryAttributeValue } from '@app/category/entity/category-attribute-value.entity';
import { CategoryController } from '@app/category/category.controller';
import { CategoryService } from '@app/category/category.service';

@Module({
  imports: [MikroOrmModule.forFeature([Category, CategoryAttribute, CategoryAttributeValue])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
