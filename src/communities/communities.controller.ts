import { ContentsService } from './../contents/contents.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Status } from '@prisma/client';

@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly contentsService: ContentsService,
  ) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  findAll() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(id);
  }

  @Get(':id/contents')
  findOneWithContents(
    @Param('id') id: string,
    @Query('status') status?: Status,
  ) {
    return this.contentsService.findContentByCommunity(id, status);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communitiesService.update(id, updateCommunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(id);
  }
}
