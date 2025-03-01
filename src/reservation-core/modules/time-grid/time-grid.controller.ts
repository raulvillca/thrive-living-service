import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeGridService } from './time-grid.service';
import { TimeGridDto } from '../../entities/dto/time-grid.dto';

@Controller('meeting')
export class TimeGridController {
  constructor(private readonly timeGridService: TimeGridService) {}

  @Post()
  create(@Body() timeGridDto: TimeGridDto) {
    return this.timeGridService.create(timeGridDto);
  }

  @Get()
  findAll() {
    return this.timeGridService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeGridService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() timeGridDto: TimeGridDto) {
    return this.timeGridService.update(+id, timeGridDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeGridService.remove(+id);
  }
}
