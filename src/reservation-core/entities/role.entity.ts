import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ schema: 'reservation_schema', name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  title_role: string;
  @ManyToOne(() => User)
  user: User;
}
