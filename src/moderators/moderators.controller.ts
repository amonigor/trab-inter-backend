import { Controller, Get, Post, Body } from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';

@Controller('moderators')
export class ModeratorsController {
  constructor(private readonly moderatorsService: ModeratorsService) {}

  @Post()
  create(@Body() createModeratorDto: CreateModeratorDto) {
    return this.moderatorsService.create(createModeratorDto);
  }

  @Get()
  findAll() {
    return this.moderatorsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.moderatorsService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.moderatorsService.remove(id);
  // }
}
