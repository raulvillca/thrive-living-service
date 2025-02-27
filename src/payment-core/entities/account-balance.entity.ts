import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsEnum } from 'class-validator';
import { Invoice } from './invoice.entity';
import { Payment } from './payment.entity';

export enum AccountStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  ERROR = 'ERROR',
  CANCEL = 'CANCEL',
}

@Entity({ schema: 'payments_schema', name: 'current_accounts' })
export class CurrentAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', default: 0 })
  @IsNumber()
  balance: number;
  @Column({ type: 'decimal', default: 0 })
  @IsNumber()
  totalDebt: number;
  @Column({ type: 'decimal', default: 0 })
  @IsNumber()
  totalPaid: number;
  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  @IsEnum(AccountStatus)
  status: AccountStatus;
  @Column()
  @IsNumber()
  userId: number;
  @Column()
  @IsNumber()
  headquarterId: number;
  @OneToMany(() => Invoice, (invoice) => invoice.currentAccount)
  invoices: Invoice[];
  @OneToMany(() => Payment, (payment) => payment.currentAccount)
  payments: Payment[];
}
