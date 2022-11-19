import { ContentsService } from './../contents/contents.service';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, PrismaService, ContentsService],
})
export class CommunitiesModule {}
