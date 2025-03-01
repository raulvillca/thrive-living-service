import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

@Entity({ schema: 'reservation_schema', name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  name: string;
  @Column({ length: 100 })
  @IsString()
  nameUrl: string;
  @Column({ type: 'date', nullable: true })
  @IsDate()
  @IsOptional()
  initialDate?: Date;
  @Column({ length: 20, nullable: false })
  @IsString()
  @IsOptional()
  phone: string;
  @Column({ type: 'text', nullable: false })
  @IsString()
  @IsOptional()
  description: string;
  @Column({ unique: true })
  @IsEmail()
  email: string;
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string;
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  logoUrl?: string;
  @Column({ nullable: false })
  @IsBoolean()
  active: boolean;
}
