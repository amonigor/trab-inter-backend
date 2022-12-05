import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    const passEncrypted = await bcrypt.hash(createUserDto.password, 10);
    const data = {
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      password: passEncrypted,
    };

    return this.prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    });
  }

  findUserFromToken(auth: string) {
    const tokenDecoded: any = this.jwtService.decode(auth);
    return this.prisma.user.findUnique({
      where: { email: tokenDecoded.email },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    });
  }

  count() {
    return this.prisma.user.count();
  }

  async isModerator(id_user: string, id_community: string) {
    const count = await this.prisma.moderator.count({
      where: { id_user, id_community },
    });

    return Boolean(count);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const passEncrypted = await bcrypt.hash(updateUserDto.password, 10);
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, password: passEncrypted },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
