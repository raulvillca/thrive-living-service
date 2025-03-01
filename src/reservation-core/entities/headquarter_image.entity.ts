import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { User } from './user.entity';
import { Headquarter } from './headquarter.entity';

@Entity({ schema: 'reservation_schema', name: 'user_images' })
export class HeadquarterImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  url: string;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
  @ManyToOne(() => User)
  user: User;
}
