import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentStatus } from '@prisma/client';

@Injectable()
export class ContentsService {
  constructor(private prisma: PrismaService) {}

  create(createContentDto: CreateContentDto) {
    const data = {
      description: createContentDto.description,
      link: createContentDto.link,
      value: createContentDto.value,
      level: createContentDto.level,
      type: createContentDto.type,
      status: createContentDto.status,
      Community: {
        connect: {
          id: createContentDto.id_community,
        },
      },
    };

    return this.prisma.content.create({
      data,
      select: {
        id: true,
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
        id_community: true,
      },
    });
  }

  findAll() {
    return this.prisma.content.findMany({
      select: {
        id: true,
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
        id_community: true,
      },
    });
  }

  async findContentByCommunity(id_community: string, status: ContentStatus) {
    const starter = await this.prisma.content.findMany({
      where: { id_community, status, level: 'STARTER' },
      select: {
        id: true,
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
        id_community: true,
      },
    });

    const medium = await this.prisma.content.findMany({
      where: { id_community, status, level: 'MEDIUM' },
      select: {
        id: true,
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
        id_community: true,
      },
    });

    const advanced = await this.prisma.content.findMany({
      where: { id_community, status, level: 'ADVANCED' },
      select: {
        id: true,
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
        id_community: true,
      },
    });

    return {
      starter,
      medium,
      advanced,
    };
  }

  findOne(id: string) {
    return this.prisma.content.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
        id_community: true,
      },
    });
  }

  update(id: string, updateContentDto: UpdateContentDto) {
    return this.prisma.content.update({
      where: { id },
      data: { ...updateContentDto },
      select: {
        description: true,
        link: true,
        value: true,
        level: true,
        type: true,
        status: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.content.delete({ where: { id } });
  }
}
