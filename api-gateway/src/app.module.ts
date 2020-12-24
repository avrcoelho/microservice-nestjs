import { Module, HttpModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import AuthModule from '@modules/auth/Auth.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}