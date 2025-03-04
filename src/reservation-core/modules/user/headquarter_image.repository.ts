import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HeadquarterImage } from '../../entities/headquarter_image.entity';
import { HeadquarterImageNoFoundException } from '../../commons/headquarter.exception';

@Injectable()
export class HeadquarterImageRepository extends Repository<HeadquarterImage> {
  async findByIdAndUserId(
    id: number,
    userId: number,
    headquarterId: number,
  ): Promise<HeadquarterImage> {
    const user = await this.findOne({
      where: { id, headquarter: { id: headquarterId }, user: { id: userId } },
      select: ['id', 'url'],
    });
    if (!user) {
      throw new HeadquarterImageNoFoundException(id);
    }
    return user;
  }
}
