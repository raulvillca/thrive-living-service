import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from '../../entities/dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() companyDto: CompanyDto) {
    return this.companyService.create(companyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() companyDto: CompanyDto) {
    return this.companyService.update(+id, companyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.companyService.remove(+id);
  }
}
