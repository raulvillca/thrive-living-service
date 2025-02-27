import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsString } from 'class-validator';
import { Invoice } from './invoice.entity';

@Entity({ schema: 'payments_schema', name: 'point_of_sales' })
export class PointOfSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  code: string;
  @Column()
  @IsString()
  name: string;
  @Column()
  @IsString()
  location: string;
  @Column({ default: true })
  @IsBoolean()
  active: boolean;
  @OneToMany(() => Invoice, (invoice) => invoice.pointOfSale)
  invoices: Invoice[];
}
