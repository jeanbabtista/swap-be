import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { ApiDatabaseErrorResponse } from '@app/pg/decorator/api-database-error-response.decorator';
import { CategoryService } from '@app/category/category.service';
import { RequestUserSub } from '@app/auth/decorators/request-user.decorator';
import { UserService } from '@app/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @Auth()
  @ApiDatabaseErrorResponse()
  async create(@RequestUserSub() sub: string, @Body() data: CreateProductDto) {
    const user = await this.userService.findOneByFirebaseSubOrFail(sub);
    return this.productService.createProduct(user, data);
  }

  @Get()
  findAllProductsByUserSub() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
