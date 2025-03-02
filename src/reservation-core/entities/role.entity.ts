import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Headquarter } from './headquarter.entity';

export enum RoleType {
  SUPPORT = 'support',
  SUPERVISOR = 'supervisor',
  MODERATOR = 'moderator',
  CLIENT = 'client',
}

@Entity({ schema: 'reservation_schema', name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  roleTitle: string;
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.CLIENT,
  })
  type: RoleType;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
}
