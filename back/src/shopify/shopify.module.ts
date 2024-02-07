import { Module } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { ShopifyController } from './shopify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ShopifyService],
  controllers: [ShopifyController],
})
export class ShopifyModule {}
