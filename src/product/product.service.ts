import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '@app/user/entity/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from '@app/product/entity/product.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductActivity } from '@app/product/entity/product-activity.entity';
import { ProductAttribute } from '@app/product/entity/product-attribute.entity';
import { ProductMedia } from '@app/product/entity/product-media.entity';
import { MediaService } from '@app/media/media.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(ProductActivity)
    private readonly productActivityRepository: EntityRepository<ProductActivity>,
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: EntityRepository<ProductAttribute>,
    @InjectRepository(ProductMedia)
    private readonly productMediaRepository: EntityRepository<ProductMedia>,
    private readonly mediaService: MediaService,
  ) {}

  async createProduct(user: User, data: CreateProductDto) {
    const { media } = data;
    for (const { id, order } of media) {
      await this.mediaService.uploadMedia({} as Express.Multer.File);
    }

    const product = new Product();
    product.name = data.name;
    product.shortDescription = data.shortDescription;
    product.longDescription = data.longDescription;
    product.condition = data.condition;
    product.user = user;

    return 'This action adds a new product';
  }

  async uploadMedia(file: Express.Multer.File) {}

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
