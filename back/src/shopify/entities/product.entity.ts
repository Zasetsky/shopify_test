import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  bodyHtml: string;

  @Column({ type: 'text' })
  imageUrl: string;
}
