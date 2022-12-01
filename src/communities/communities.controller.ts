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
import { ContentStatus } from '@prisma/client';

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

  @Get('search')
  search(
    @Query('term') term: string,
    @Query('id_category') id_category: string,
  ) {
    return this.communitiesService.search(term, id_category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(id);
  }

  @Get(':id/contents')
  findOneWithContents(
    @Param('id') id: string,
    @Query('status') status?: ContentStatus,
  ) {
    return this.contentsService.findContentByCommunity(id, status);
  }

  @Get(':id/related')
  findRelatedCommunities(@Param('id') id: string) {
    return this.communitiesService.findRelatedCommunities(id);
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
