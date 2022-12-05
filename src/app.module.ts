import { ModeratorsModule } from './moderators/moderators.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { ContentsModule } from './contents/contents.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { ModeratorsController } from './moderators/moderators.controller';
import { ContentsController } from './contents/contents.controller';
import { CommunitiesController } from './communities/communities.controller';
import { SuggestionsController } from './suggestions/suggestions.controller';

@Module({
  imports: [
    UsersModule,
    CommunitiesModule,
    ContentsModule,
    ModeratorsModule,
    SuggestionsModule,
    CategoriesModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/count', method: RequestMethod.GET },
        { path: 'contents', method: RequestMethod.GET },
        { path: 'contents/(.*)', method: RequestMethod.GET },
        { path: 'communities', method: RequestMethod.GET },
        { path: 'communities/(.*)', method: RequestMethod.GET },
      )
      .forRoutes(
        UsersController,
        ModeratorsController,
        ContentsController,
        CommunitiesController,
        SuggestionsController,
      );
  }
}
