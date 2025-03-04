import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { Headquarter } from './headquarter.entity';

@Entity({ schema: 'reservation_schema', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;
  @Column()
  @IsString()
  surname: string;
  @Column({ type: 'date' })
  birthdate: Date;
  @Column({ default: true })
  @IsBoolean()
  active: boolean;
  @Column({ nullable: true })
  @IsOptional()
  imageUrl?: string;
  @Column()
  password: string;
  @Column({ unique: true })
  @IsEmail()
  email: string;
  @Column({ nullable: true })
  @IsOptional()
  goal?: string;
  @Column({ nullable: true })
  @IsOptional()
  observation?: string;
  @Column({ nullable: true })
  @IsOptional()
  phone?: string;
  @Column({ nullable: true })
  @IsOptional()
  notificationToken?: string;
  @Column({ nullable: true })
  @IsOptional()
  notificationEndpoint?: string;
  @Column({ nullable: true })
  @IsOptional()
  notificationP256dh?: string;
  @Column({ nullable: true })
  @IsOptional()
  notificationAuth?: string;
  @Column({ type: 'date' })
  startingDate: Date;
  @Column({ default: false })
  @IsBoolean()
  frequent: boolean;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
}
