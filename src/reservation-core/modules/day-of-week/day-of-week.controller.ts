import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DayOfWeekService } from './day-of-week.service';
import { DayOfWeekDto } from '../../entities/dto/day-of-week.dto';

@Controller('meeting')
export class DayOfWeekController {
  constructor(private readonly dayOfWeekService: DayOfWeekService) {}

  @Post()
  create(@Body() dayOfWeekDto: DayOfWeekDto) {
    return this.dayOfWeekService.create(dayOfWeekDto);
  }

  @Get()
  findAll() {
    return this.dayOfWeekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dayOfWeekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dayOfWeekDto: DayOfWeekDto) {
    return this.dayOfWeekService.update(+id, dayOfWeekDto);
  }

  @Delete(':id/headquarter/:headquarter_id')
  remove(
    @Param('id') id: number,
    @Param('headquarter_id') headquarterId: number,
  ) {
    return this.dayOfWeekService.remove(+id, headquarterId);
  }
}
