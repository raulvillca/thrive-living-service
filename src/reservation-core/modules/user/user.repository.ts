import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { EmailNotFoundException, UserNotFoundException } from '../../commons/user.exception';

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

  async findByEmail(email: string, headquarterId: number): Promise<User> {
    const user = await this.findOne({
      where: { email, headquarter: { id: headquarterId } },
    });
    if (!user) {
      throw new EmailNotFoundException(email);
    }
    return user;
  }

  async existsByEmail(email: string, headquarterId: number): Promise<boolean> {
    const count = await this.count({ where: { email, headquarter: { id: headquarterId } } });
    return count > 0;
  }
}
