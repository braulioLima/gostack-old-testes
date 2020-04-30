import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../util/truncate';

import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register', async () => {
    const user = await factory.attrs('User');

    const { body } = await request(app)
      .post('/users')
      .send(user);

    expect(body).toHaveProperty('id');
  });

  it('Should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { status } = await request(app)
      .post('/users')
      .send(user);

    expect(status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
