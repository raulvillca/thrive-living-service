import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Headquarter } from './headquarter.entity';
import { Role } from './role.entity';
import { User } from './user.entity';
import { IsBoolean } from 'class-validator';

@Entity({ schema: 'reservation_schema', name: 'user_roles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  active: boolean;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Role)
  role: Role;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
}
