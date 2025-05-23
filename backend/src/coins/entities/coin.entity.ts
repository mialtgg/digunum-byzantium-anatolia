import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  period: string;

  @Column()
  year: string;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;

  @Column('jsonb')
  location: {
    lat: number;
    lng: number;
    name: string;
  };

  @Column()
  mint: string;

  @Column()
  material: string;

  @Column()
  denomination: string;

  @Column('text')
  obverseDescription: string;

  @Column('text')
  reverseDescription: string;
} 