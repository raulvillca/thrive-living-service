import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { EmailNotFoundException, UserNotFoundException } from '../../commons/user.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    if (!this.dataSource) {
      throw new Error('DATA_SOURCE is not initialized');
    }
    this.repository = this.dataSource.getRepository(User);
  }

  async findById(id: number, headquarterId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarters'],
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async findByEmail(email: string, headquarterId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { email, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!user) {
      throw new EmailNotFoundException(email);
    }
    return user;
  }

  async existsByEmail(email: string, headquarterId: number): Promise<boolean> {
    const count = await this.repository.count({
      where: { email, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    return count > 0;
  }

  create(entityLike: DeepPartial<User>) {
    return this.repository.create(entityLike);
  }

  save(user: User) {
    return this.repository.save(user);
  }
}
