import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';

@Injectable()
class GetPostService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,
  ) {}

  async execute(post_id: string): Promise<Post> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new RpcException('Post not found');
    }

    return post;
  }
}

export default GetPostService;
