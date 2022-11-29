import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Status } from '@prisma/client';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    const data = {
      name: createCommunityDto.name,
      description: createCommunityDto.description,
      category: {
        connect: {
          id: createCommunityDto.id_category,
        },
      },
    };

    return this.prisma.community.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        id_category: true,
      },
    });
  }

  findAll() {
    return this.prisma.community.findMany({
      where: { status: Status.APPROVED },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.community.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        content: true,
      },
    });
  }

  update(id: string, updateCommunityDto: UpdateCommunityDto) {
    return this.prisma.community.update({
      where: { id },
      data: { ...updateCommunityDto },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
