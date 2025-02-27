import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Payment } from './payment.entity';

@Entity({ schema: 'payments_schema', name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  name: string;
  @OneToMany(() => Payment, (payment) => payment.paymentMethod)
  payments: Payment[];
}
