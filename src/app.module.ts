import { ModeratorsModule } from './moderators/moderators.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { ContentsModule } from './contents/contents.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    UsersModule,
    CommunitiesModule,
    ContentsModule,
    ModeratorsModule,
    SuggestionsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
