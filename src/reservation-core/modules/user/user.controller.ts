import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../../entities/dto/user.dto';

@Controller('activity')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(+id, userDto);
  }

  @Delete(':id/headquarter/:headquarter_id')
  async remove(@Param('id') id: number, @Param('headquarter_id') headquarterId: number) {
    await this.userService.remove(+id, headquarterId);
  }
}
