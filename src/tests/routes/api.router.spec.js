const request = require('supertest')

const Server = require('../../models/server')
const server = new Server()

const api = request(server.app)
describe ('Test /api', () => {

  test('Get a /api para obtener "Reto"', async() => {
    console.log(process.env.NODE_ENV);
    await api
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        name: 'Reto'
      });
  })
})