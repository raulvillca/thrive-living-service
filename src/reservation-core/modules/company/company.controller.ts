import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from '../../entities/dto/company.dto';
import { SecurityGuard } from '../../../security/security.guard';
import { RolesGuard } from '../../../security/roles.guard';
import { Roles } from '../../../security/roles.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() companyDto: CompanyDto) {
    return this.companyService.create(companyDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('client')
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
