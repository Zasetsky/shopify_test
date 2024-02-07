import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn('varchar')
  id: string;

  @Column({ type: 'text' })
  bodyHtml: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;
}
