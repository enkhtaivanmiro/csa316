import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  project_id: number;
}
