import { Query, Resolver } from '@nestjs/graphql';
import { ShopifyService } from './shopify.service';
import { ProductDTO } from './dto/product.dto';
import { plainToClass } from 'class-transformer';

@Resolver()
export class ProductsResolver {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Query(() => [ProductDTO])
  async products(): Promise<ProductDTO[]> {
    const products = await this.shopifyService.getAllProductsFromDB();
    return products.map(product => plainToClass(ProductDTO, product));
  }
}