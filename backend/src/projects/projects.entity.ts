import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'category_id', type: 'int' })
  category_id: number;

  @Column({ name: 'file_url', type: 'varchar', nullable: true })
  file_url: string;

  @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
  thumbnail_url: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;
}
