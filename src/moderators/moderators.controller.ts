import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

  @Get(':id/:id_user/:id_community')
  findOne(
    @Param('id') id: string,
    @Param('id_user') id_user: string,
    @Param('id_community') id_community: string,
  ) {
    return this.moderatorsService.findOne(id, id_user, id_community);
  }

  @Delete(':id/:id_user/:id_community')
  remove(
    @Param('id') id: string,
    @Param('id_user') id_user: string,
    @Param('id_community') id_community: string,
  ) {
    return this.moderatorsService.remove(id, id_user, id_community);
  }
}
