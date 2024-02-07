import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@ObjectType()
export class ProductDTO {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field()
  @IsString()
  bodyHtml: string;

  @Field({ nullable: true })
  @IsUrl()
  imageUrl?: string;
}
