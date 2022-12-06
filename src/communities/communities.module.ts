import { ContentsService } from './../contents/contents.service';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { SuggestionsService } from 'src/suggestions/suggestions.service';
import { ModeratorsService } from 'src/moderators/moderators.service';

@Module({
  controllers: [CommunitiesController],
  providers: [
    CommunitiesService,
    PrismaService,
    ContentsService,
    SuggestionsService,
    ModeratorsService,
  ],
})
export class CommunitiesModule {}
