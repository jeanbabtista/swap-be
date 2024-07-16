import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '@app/category/category.service';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all categories, attributes, and attribute values.' })
  async findAll() {
    return {
      categories: await this.categoryService.findAllCategories(),
      attributes: await this.categoryService.findAllAttributes(),
      values: await this.categoryService.findAllAttributeValues(),
    };
  }
}
