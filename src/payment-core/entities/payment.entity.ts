import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsDecimal, IsNumber, IsString } from 'class-validator';
import { Invoice } from './invoice.entity';
import { PaymentMethod } from './payment-method.entity';
import { PaymentConfiguration } from './payment-configuration.entity';
import { CurrentAccount } from './account-balance.entity';

@Entity({ schema: 'payments_schema', name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  paymentId: string;

  @Column({ type: 'decimal' })
  @IsDecimal()
  amount: number;

  @Column({ type: 'date' })
  @IsDate()
  paymentDate: Date;

  @ManyToOne(() => Invoice)
  invoice: Invoice;

  @ManyToOne(() => PaymentMethod, (method) => method.payments)
  paymentMethod: PaymentMethod;

  @ManyToOne(() => PaymentConfiguration)
  paymentConfiguration: PaymentConfiguration;

  @Column()
  @IsNumber()
  headquarterId: number;

  @Column()
  @IsNumber()
  userId: number;

  @ManyToOne(() => CurrentAccount, (account) => account.payments)
  currentAccount: CurrentAccount;
}
