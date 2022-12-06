import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { InviteModeratorDto } from './dto/invite-moderator.dto';

@Injectable()
export class ModeratorsService {
  constructor(private prisma: PrismaService) {}

  create(createModeratorDto: CreateModeratorDto) {
    const data = {
      user: {
        connect: {
          id: createModeratorDto.id_user,
        },
      },
      community: {
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

  findOne(id: string, id_user: string, id_community: string) {
    return this.prisma.moderator.findUnique({
      where: { id_id_user_id_community: { id, id_user, id_community } },
      select: {
        id: true,
        id_user: true,
        id_community: true,
      },
    });
  }

  async invite(inviteModeratorDto: InviteModeratorDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: inviteModeratorDto.email },
    });

    if (user) {
      await this.prisma.moderator.create({
        data: {
          id_user: user.id,
          id_community: inviteModeratorDto.id_community,
        },
      });
    }
  }

  findModeratorsByCommunity(id_community: string) {
    return this.prisma.moderator.findMany({
      where: { id_community },
      select: {
        id: true,
        id_user: true,
        id_community: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  remove(id: string, id_user: string, id_community: string) {
    return this.prisma.moderator.delete({
      where: { id_id_user_id_community: { id, id_user, id_community } },
    });
  }
}
