import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rental_pricing')
export class Rental_Pricing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_id: number;

    @Column()
    type: string;

    @Column()
    price: number;
}