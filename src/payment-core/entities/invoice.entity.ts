import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsDecimal, IsNumber, IsString } from 'class-validator';
import { PointOfSale } from './point-of-sale.entity';
import { CurrentAccount } from './account-balance.entity';

export enum InvoiceType {
  RECEIVED = 'received',
  ACCRUED = 'accrued',
}

@Entity({ schema: 'payments_schema', name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  invoiceNumber: string;

  @Column({ type: 'date' })
  @IsDate()
  issueDate: Date;

  @Column({ type: 'timestamp' })
  @IsDate()
  createAt: Date;

  @Column({ type: 'decimal' })
  @IsDecimal()
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: InvoiceType,
    default: InvoiceType.RECEIVED,
  })
  type: InvoiceType;

  @ManyToOne(() => PointOfSale, (pointOfSale) => pointOfSale.invoices)
  pointOfSale: PointOfSale;

  @Column()
  @IsNumber()
  headquarterId: number;

  @Column()
  @IsNumber()
  userId: number;

  @ManyToOne(() => CurrentAccount, (account) => account.invoices)
  currentAccount: CurrentAccount;
}
