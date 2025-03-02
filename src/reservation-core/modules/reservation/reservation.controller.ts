import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from '../../entities/dto/reservation.dto';
import { CommentDto } from '../../entities/dto/comment.dto';
import { CommentService } from './comment.service';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  create(@Body() reservationDto: ReservationDto) {
    return this.reservationService.create(reservationDto);
  }

  @Post('/comment')
  createComment(@Body() commentDto: CommentDto) {
    return this.commentService.create(commentDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() reservationDto: ReservationDto) {
    return this.reservationService.update(+id, reservationDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: number,
    @Param('headquarter_id') headquarterId: number,
  ) {
    return this.reservationService.remove(+id, headquarterId);
  }
}
