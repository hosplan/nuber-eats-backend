import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it.todo('me')
  it.todo('userProfile')
  it.todo('createAccount')
  it.todo('login')
  it.todo('editProfile')
  it.todo('verifyEmail')
});
