import { Injectable, OnModuleInit  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';
import { ProductDTO } from './dto/product.dto';
import { validate } from 'class-validator';

interface ShopifyProductNode {
  id: string;
  bodyHtml: string;
  images: {
    edges: Array<{
      node: {
        src: string;
      };
    }>;
  };
}

interface ShopifyProductEdge {
  cursor: string;
  node: ShopifyProductNode;
}

interface ShopifyProductsResponse {
  data: {
    products: {
      edges: ShopifyProductEdge[];
      pageInfo: {
        hasNextPage: boolean;
      };
    };
  };
}

@Injectable()
export class ShopifyService implements OnModuleInit {
  private axiosInstance: AxiosInstance;

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private configService: ConfigService,
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.configService.get<string>('shopify.url'),
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.configService.get<string>('shopify.accessToken'),
      },
    });
  }

  async onModuleInit() {
    const products = await this.fetchAllProducts();
    await this.saveProducts(products);
  }

  async fetchAllProducts(cursor = null): Promise<ShopifyProductNode[]> {
    const query = `
      query {
        products(first: 10${cursor ? `, after: "${cursor}"` : ''}) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              bodyHtml
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await this.makeGraphQLRequest(query) as ShopifyProductsResponse;
    let allProducts = response.data.products.edges.map((edge) => edge.node);

    if (response.data.products.pageInfo.hasNextPage) {
      const nextCursor = response.data.products.edges[response.data.products.edges.length - 1].cursor;
      allProducts = allProducts.concat(await this.fetchAllProducts(nextCursor));
    }

    return allProducts;
  }
  
  async makeGraphQLRequest(query: string) {
    try {
      const response = await this.axiosInstance.post('', { query });
      if (response.data.errors) {
        console.error('Shopify GraphQL errors:', response.data.errors);
        throw new Error('GraphQL errors occurred');
      }
      return response.data;
    } catch (error) {
      console.error('GraphQL request failed:', error);
      throw new Error('GraphQL request failed');
    }
  }

  async saveProducts(products: ShopifyProductNode[]) {
    for (const product of products) {
      // Преобразование и валидация
      const productDto = plainToClass(ProductDTO, {
        id: product.id,
        bodyHtml: product.bodyHtml,
        imageUrl: product.images.edges[0]?.node.src || '',
      });
  
      const errors = await validate(productDto);
      if (errors.length > 0) {
        // Обработка ошибок валидации
        console.error('Validation errors:', errors);
        continue; // Пропускаем продукты с ошибками валидации
      }
  
      // Сохранение продукта после успешной валидации
      const productEntity = this.productRepository.create(productDto);
      await this.productRepository.save(productEntity);
    }
  }

  async getAllProductsFromDB(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
