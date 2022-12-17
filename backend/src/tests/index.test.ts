import request from 'supertest'
import { sequelize } from '../db.js'
import app from '../index.js'


describe('api/users', () => {
  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })

  })
  describe('POST /register', () => {
    it('Should return access token with status code 200', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '12345678',
          firstName: 'test',
          lastName: 'test',
          gender: 'Male',
          birthYear: 1967,
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })
    it('Should return error code 404, because user with this email already exists', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '12345678',
          firstName: 'test',
          lastName: 'test',
          gender: 'Male',
          birthYear: 1967,
        })
      expect(res.statusCode).toEqual(404)
    })

  })
  describe('POST /login', () => {
    it('Should return access token with status code 200', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '12345678',
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })
    it('Should return error code 404, because password incorrect', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '1234567',
        })
      expect(res.statusCode).toEqual(403)
    })
    it('Should return error code 404, because email incorrect', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'eodinzov94@gmail.con',
          password: '12345678',
        })
      expect(res.statusCode).toEqual(403)
    })

  })
  afterAll(async () => {
    await sequelize.close()
  })

})