import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterDto } from '../../entities/dto/headquarter.dto';

@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  create(@Body() headquarterDto: HeadquarterDto) {
    return this.headquarterService.create(headquarterDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() headquarterDto: HeadquarterDto) {
    return this.headquarterService.update(+id, headquarterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.headquarterService.remove(+id);
  }
}
