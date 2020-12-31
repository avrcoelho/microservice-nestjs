import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';

@Injectable()
class GetUserPostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,
  ) {}

  async execute(user_id: string): Promise<Post[]> {
    const posts = await this.postsRepository.findByUserId(user_id);

    return posts;
  }
}

export default GetUserPostsService;
