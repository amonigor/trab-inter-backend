import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) {}

  create(createSuggestionDto: CreateSuggestionDto) {
    const data = {
      description: createSuggestionDto.description,
      status: createSuggestionDto.status,
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
        description: true,
        status: true,
        id_user: true,
      },
    });
  }

  findAll() {
    return this.prisma.suggestion.findMany({
      select: {
        id: true,
        description: true,
        status: true,
        id_user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.suggestion.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        status: true,
        id_user: true,
      },
    });
  }

  update(id: string, updateSuggestionDto: UpdateSuggestionDto) {
    return this.prisma.suggestion.update({
      where: { id },
      data: { ...updateSuggestionDto },
      select: {
        description: true,
        status: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.suggestion.delete({ where: { id } });
  }
}
