import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../commons/user.exception';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number): Promise<User> {
    const user = await this.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarters'],
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  }
}
