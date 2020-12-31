import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostModule from '@modules/post/Post.module';

@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
