import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';
import IUpdatePostDTO from '../dtos/IUpdatePost.dto';

@Injectable()
class UpdatePostService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,
  ) {}

  async execute({ data, id }: IUpdatePostDTO): Promise<Post> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new RpcException('Post not found');
    }

    Object.assign(post, { ...data });

    await this.postsRepository.savePost(post);

    return post;
  }
}

export default UpdatePostService;
