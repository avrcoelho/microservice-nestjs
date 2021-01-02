import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';

describe('Auth controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to authentication success', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
        auth(data: {
          email:"andrevrcoelho@hotmail.com",
          password:"123456"
        }) {
          id,
          token
        }
      }`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.auth).toHaveProperty('id');
        expect(body.data.auth).toHaveProperty('token');
      });
  });

  it('should be able to dont authentication', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
        auth(data: {
          email:"andrevrcoelho@hotmail.com",
          password:""
        }) {
          id,
          token
        }
      }`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('errors');
      });
  });
});
