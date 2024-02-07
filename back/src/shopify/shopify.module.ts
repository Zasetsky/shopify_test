import { Module } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { ProductsResolver } from './shopify.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ShopifyService, ProductsResolver],
})
export class ShopifyModule {}
