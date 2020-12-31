import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import PostEntity from '../../typeorm/entities/Post.entity';
import CreatePostService from '../../../services/CreatePost.service';
import GetPostService from '../../../services/GetPost.service';
import GetUserPostsService from '../../../services/GetUserPosts.service';
import ICreatePostDTO from '../../../dtos/ICreatePost.dto';
import IUpdatePostDTO from '../../../dtos/IUpdatePost.dto';
import UpdatePostService from '../../../services/UpdatePost.service';
import DeletePostService from '../../../services/DeletePost.service';

@Controller()
export default class PostResolver {
  constructor(
    private readonly createPostService: CreatePostService,
    private readonly updatePostService: UpdatePostService,
    private readonly deletePostService: DeletePostService,
    private readonly getPostService: GetPostService,
    private readonly getUserPostsService: GetUserPostsService,
  ) {}

  @MessagePattern('user-posts')
  public async index(@Payload() userId: string): Promise<PostEntity[]> {
    const post = await this.getUserPostsService.execute(userId);

    return post;
  }

  @MessagePattern('show-post')
  public async show(@Payload() id: string): Promise<PostEntity> {
    const post = await this.getPostService.execute(id);

    return post;
  }

  @MessagePattern('create-post')
  public async create(@Payload() data: ICreatePostDTO): Promise<PostEntity> {
    const post = await this.createPostService.execute(data);

    return post;
  }

  @MessagePattern('update-post')
  public async update(
    @Payload() { data, id }: IUpdatePostDTO,
  ): Promise<PostEntity> {
    const post = await this.updatePostService.execute({ data, id });

    return post;
  }

  @MessagePattern('update-post')
  public async delete(@Payload() id: string): Promise<PostEntity> {
    const post = await this.deletePostService.execute(id);

    return post;
  }
}
