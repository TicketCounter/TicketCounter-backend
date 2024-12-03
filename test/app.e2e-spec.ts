import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('AuthController (e2e)', () => {
    it('/auth/register (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          password: 'password',
        })
        .expect(201);
    });

    it('/auth/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('token');
        });
    });
  });

  describe('EventsController (e2e)', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password',
        });
      token = response.body.token;
    });

    it('/events/create (POST)', () => {
      return request(app.getHttpServer())
        .post('/events/create')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Event',
          description: 'Test Description',
          date: new Date().toISOString(),
        })
        .expect(201);
    });

    it('/events (GET)', () => {
      return request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
});