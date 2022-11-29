import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    const data = {
      name: createCommunityDto.name,
      description: createCommunityDto.description,
      Category: {
        id: createCommunityDto.id_category,
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
      select: {
        id: true,
        name: true,
        description: true,
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
