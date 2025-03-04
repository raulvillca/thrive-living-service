import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentDto } from '../../entities/dto/comment.dto';
import { ReservationRepository } from './reservation.repository';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async create(commentDto: CommentDto) {
    const { reservationId, headquarterId, ...commentData } = commentDto;
    const reservation = await this.reservationRepository.findById(reservationId, headquarterId);
    const comment = this.commentRepository.create({
      ...commentData,
    });
    comment.reservation = reservation;
    return this.commentRepository.save(comment);
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  async update(id: number, commentDto: CommentDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { reservationId, headquarterId, ...commentData } = commentDto;
    const comment = await this.commentRepository.findById(id, reservationId);
    const updatedComment = {
      ...commentData,
      id: comment.id,
      reservation: comment.reservation,
    } as Comment;
    return this.commentRepository.save(updatedComment);
  }

  async remove(id: number, reservationId: number) {
    const comment = await this.commentRepository.findById(id, reservationId);
    await this.commentRepository.remove(comment);
  }
}
