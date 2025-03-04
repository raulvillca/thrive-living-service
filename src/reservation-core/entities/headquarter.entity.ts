import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { IsBoolean, IsString } from 'class-validator';
import { Role } from './role.entity';

@Entity({ schema: 'reservation_schema', name: 'headquarters' })
export class Headquarter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  location: string;
  @Column()
  @IsBoolean()
  active: boolean;
  @ManyToOne(() => Company)
  company: Company;
  @ManyToOne(() => Role, { nullable: true })
  supervisor: Role;
}
