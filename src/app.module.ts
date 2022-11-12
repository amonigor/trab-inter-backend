import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';

@Module({
  imports: [UsersModule, CommunitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
