import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import {
  CreateHeadquarterDto,
  UpdateHeadquarterDto,
} from '../../entities/dto/headquarter.dto';

@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  create(@Body() createHeadquarterDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createHeadquarterDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeadquarterDto: UpdateHeadquarterDto,
  ) {
    return this.headquarterService.update(+id, updateHeadquarterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headquarterService.remove(+id);
  }
}
