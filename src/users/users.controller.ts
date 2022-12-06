import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommunitiesService } from 'src/communities/communities.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('count')
  count() {
    return this.usersService.count();
  }

  @Get('token')
  findUserFromToken(@Headers('Authorization') auth: string) {
    return this.usersService.findUserFromToken(auth);
  }

  @Get('ismoderator/:id_user/:id_community')
  isModerator(
    @Param('id_user') id_user: string,
    @Param('id_community') id_community: string,
  ) {
    return this.usersService.isModerator(id_user, id_community);
  }

  @Get(':id/communities')
  findCommunitiesByUser(@Param('id') id: string) {
    return this.communitiesService.findCommunitiesByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
