import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from '@app/category/entity/category.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CategoryAttribute } from '@app/category/entity/category-attribute.entity';
import { CategoryAttributeValue } from '@app/category/entity/category-attribute-value.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    @InjectRepository(CategoryAttribute)
    private readonly categoryAttributeRepository: EntityRepository<CategoryAttribute>,
    @InjectRepository(CategoryAttributeValue)
    private readonly categoryAttributeValueRepository: EntityRepository<CategoryAttributeValue>,
  ) {}

  async findAllCategories() {
    return await this.categoryRepository.findAll();
  }

  async findCategoryById(id: string) {
    return await this.categoryRepository.findOneOrFail({ id });
  }

  async findAllAttributes() {
    return await this.categoryAttributeRepository.findAll();
  }

  async findAllAttributeValues() {
    return await this.categoryAttributeValueRepository.findAll();
  }
}
