import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from '../../entities/comment.entity';
import { CommentNoFoundException } from '../../commons/reservation.exception';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findById(id: number, reservationId: number) {
    const comment = await this.findOne({
      where: { id, reservation: { id: reservationId } },
      relations: ['reservations'],
    });
    if (!comment) {
      throw new CommentNoFoundException(id, reservationId);
    }
    return comment;
  }
}
