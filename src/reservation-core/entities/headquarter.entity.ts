import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supervisor } from './supervisor.entity';
import { Company } from './company.entity';
import { IsBoolean, IsString } from 'class-validator';

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
  @ManyToOne(() => Supervisor)
  supervisor: Supervisor;
}
