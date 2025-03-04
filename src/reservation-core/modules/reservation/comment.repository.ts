import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from '../../entities/comment.entity';
import { CommentNoFoundException } from '../../commons/reservation.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class CommentRepository {
  private repository: Repository<Comment>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Comment);
  }

  async findById(id: number, reservationId: number) {
    const comment = await this.repository.findOne({
      where: { id, reservation: { id: reservationId } },
      relations: ['reservations'],
    });
    if (!comment) {
      throw new CommentNoFoundException(id, reservationId);
    }
    return comment;
  }

  create(comment: DeepPartial<Comment>) {
    return this.repository.create(comment);
  }

  save(comment: Comment) {
    return this.repository.save(comment);
  }

  remove(comment: Comment) {
    return this.repository.remove(comment);
  }
}
