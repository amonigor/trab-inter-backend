import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { Status } from '@prisma/client';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) {}

  create(createSuggestionDto: CreateSuggestionDto) {
    const data = {
      type: createSuggestionDto.type,
      content_description: createSuggestionDto.description || null,
      content_link: createSuggestionDto.link || null,
      content_value: createSuggestionDto.value || null,
      content_level: createSuggestionDto.level || null,
      content_type: createSuggestionDto.content_type || null,
      content_id_community: createSuggestionDto.id_community,
      content: createSuggestionDto.id_content
        ? {
            connect: {
              id: createSuggestionDto.id_content,
            },
          }
        : undefined,
      user: {
        connect: {
          id: createSuggestionDto.id_user,
        },
      },
    };

    return this.prisma.suggestion.create({
      data,
      select: {
        id: true,
        type: true,
        status: true,
        content_description: true,
        content_link: true,
        content_value: true,
        content_level: true,
        content_type: true,
        content_id_community: true,
        id_content: true,
        id_user: true,
      },
    });
  }

  findAll() {
    return this.prisma.suggestion.findMany({
      select: {
        id: true,
        type: true,
        status: true,
        content_description: true,
        content_link: true,
        content_value: true,
        content_level: true,
        content_type: true,
        content_id_community: true,
        id_content: true,
        id_user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.suggestion.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        status: true,
        content_description: true,
        content_link: true,
        content_value: true,
        content_level: true,
        content_type: true,
        content_id_community: true,
        id_content: true,
        id_user: true,
      },
    });
  }

  findSuggestionByCommunity(id_community: string, status: Status) {
    return this.prisma.suggestion.findMany({
      where: { content_id_community: id_community, status },
    });
  }

  approve(id: string) {
    return this.prisma.suggestion.update({
      where: { id },
      data: { status: Status.APPROVED },
    });
  }

  deny(id: string) {
    return this.prisma.suggestion.update({
      where: { id },
      data: { status: Status.DENIED },
    });
  }

  update(id: string, updateSuggestionDto: UpdateSuggestionDto) {
    const data = {
      status: updateSuggestionDto.status,
      content_description: updateSuggestionDto.description,
    };
    return this.prisma.suggestion.update({
      where: { id },
      data,
      select: {
        id: true,
        type: true,
        status: true,
        content_description: true,
        content_link: true,
        content_value: true,
        content_level: true,
        content_type: true,
        content_id_community: true,
        id_content: true,
        id_user: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.suggestion.delete({ where: { id } });
  }
}
