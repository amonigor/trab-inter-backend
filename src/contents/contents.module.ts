import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService, PrismaService],
})
export class ContentsModule {}
