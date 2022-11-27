import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';

@Injectable()
export class ModeratorsService {
  constructor(private prisma: PrismaService) {}

  create(createModeratorDto: CreateModeratorDto) {
    const data = {
      User: {
        connect: {
          id: createModeratorDto.id_user,
        },
      },
      Community: {
        connect: {
          id: createModeratorDto.id_community,
        },
      },
    };

    return this.prisma.moderator.create({
      data,
      select: {
        id: true,
        id_user: true,
        id_community: true,
      },
    });
  }

  findAll() {
    return this.prisma.moderator.findMany({
      select: {
        id: true,
        id_user: true,
        id_community: true,
      },
    });
  }

  // findOne(id: string) {
  //   return this.prisma.moderator.findUnique({
  //     where: { id },
  //     select: {
  //       id: true,
  //       id_user: true,
  //       id_community: true,
  //     },
  //   });
  // }

  // remove(id: string) {
  //   return this.prisma.moderator.delete({ where: { id } });
  // }
}
