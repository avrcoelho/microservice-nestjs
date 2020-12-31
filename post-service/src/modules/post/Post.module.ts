import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostRepository from './infra/typeorm/repositories/Post.repository';
import CreatePostService from './services/CreatePost.service';
import UpdatePostService from './services/UpdatePost.service';
import DeletePostService from './services/DeletePost.service';
import GetPostService from './services/GetPost.service';
import GetUserPostsService from './services/GetUserPosts.service';
import PostController from './infra/eventPattern/controllers/Post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [
    CreatePostService,
    UpdatePostService,
    GetPostService,
    GetUserPostsService,
    DeletePostService,
  ],
  controllers: [PostController],
})
export default class PostModule {}
