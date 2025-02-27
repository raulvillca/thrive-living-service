import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsInt, IsString, Min } from 'class-validator';
import { Headquarter } from './headquarter.entity';

@Entity({ schema: 'reservation_schema', name: 'activities' })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  name: string;
  @Column({ type: 'text', nullable: true })
  @IsString()
  description?: string;
  @Column()
  @IsBoolean()
  active: boolean;
  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  everyWeek: boolean;
  @Column({ type: 'int', default: 0 })
  @IsInt()
  @Min(0)
  quantity: number;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
}
