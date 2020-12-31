import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';
import ICreatePostDTO from '../dtos/ICreatePost.dto';

@Injectable()
class CreatePostService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,
  ) {}

  async execute(data: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.createPost(data);

    return post;
  }
}

export default CreatePostService;
