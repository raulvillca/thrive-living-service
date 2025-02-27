import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

@Entity({ schema: 'payments_schema', name: 'payment_configurations' })
export class PaymentConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taxPercentage: number;
  @OneToOne(() => PaymentMethod)
  paymentMethod: PaymentMethod;
}
