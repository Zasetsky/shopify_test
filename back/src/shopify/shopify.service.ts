import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import axios from 'axios';

@Injectable()
export class ShopifyService {
  private readonly shopifyUrl =
    'https://cpb-new-developer.myshopify.com/admin/api/2023-10/graphql.json';
  private readonly accessToken = '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';
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async fetchProducts() {
    const query = `
            {
                products(first: 10) {
                    edges {
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

    try {
      const response = await axios({
        url: this.shopifyUrl,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': this.accessToken,
        },
        data: JSON.stringify({ query }),
      });

      return response.data.data.products.edges.map((edge) => edge.node);
    } catch (error) {
      console.error('Error fetching products from Shopify:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async saveProducts(products: any[]) {
    const productEntities = products.map((product) => {
      const { bodyHtml, images } = product;
      return this.productRepository.create({
        bodyHtml,
        imageUrl: images.edges[0]?.node.src || '',
      });
    });

    await this.productRepository.save(productEntities);
  }
}
