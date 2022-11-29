import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) {}

  create(createSuggestionDto: CreateSuggestionDto) {
    const data = {
      type: createSuggestionDto.type,
      status: createSuggestionDto.status,
      content_description: createSuggestionDto.description,
      content_link: createSuggestionDto.link,
      content_value: createSuggestionDto.value,
      content_level: createSuggestionDto.level,
      content_type: createSuggestionDto.content_type,
      Content: {
        connect: {
          id: createSuggestionDto.id_content,
        },
      },
      User: {
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
        id_content: true,
        id_user: true,
      },
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
        id_content: true,
        id_user: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.suggestion.delete({ where: { id } });
  }
}
