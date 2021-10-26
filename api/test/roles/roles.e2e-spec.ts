import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { mockPassengerRide } from './mock-data';
import AppModule from 'app.module';

describe('Roles', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('Admin role', () => {
    let adminToken = '';

    beforeAll(async () => {
      const { body } = await request(app.getHttpServer())
        .post('/login')
        .send({ email: 'admin@thebeat.co', password: 'changeIt!' });

      adminToken = `Bearer ${body.accessToken}`;
    });

    it('should list all invoices', async () => {
      await request(app.getHttpServer())
        .get('/invoices')
        .set('Authorization', adminToken)
        .expect(200);
    });
  });

  describe('Passenger Role', () => {
    let passengerToken = '';

    beforeAll(async () => {
      const { body } = await request(app.getHttpServer())
        .post('/login')
        .send({ email: 'renzo.rojas@thebeat.co', password: 'changeIt' });

      passengerToken = `Bearer ${body.accessToken}`;
    });

    it('Should list only his invoices', async () => {
      await request(app.getHttpServer())
        .get('/rides')
        .set('Authorization', passengerToken)
        .expect(200);
    });

    it('Should list only his rides', async () => {
      await request(app.getHttpServer())
        .get('/rides')
        .set('Authorization', passengerToken)
        .expect(200);
    });

    it('Should list a single ride', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/rides/${mockPassengerRide.id}`)
        .set('Authorization', passengerToken)
        .expect(200);

      expect(body).toMatchObject(mockPassengerRide);
    });
  });
});
