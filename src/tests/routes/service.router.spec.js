const { afterAll } = require('jest-circus')
const request = require('supertest')

const Server = require('../../models/server')
const Service = require('../../models/service.model')

const server = new Server()

const api = request(server.app)
describe ('Test /api/service', () => {

  const initialService = [
    {
      "user_id": 6,
	    "date_of_service": "2021-10-01T05:00:00.000Z", 
      "products": [ 
        {
          "id": 1,
          "qty": 50 
        },
        {
          "id": 4,
          "qty": 2 
        }
      ]
    },
    {
      "user_id": 5,
	    "date_of_service": "2021-10-02T05:00:00.000Z", 
      "products": [ 
        {
          "id": 1,
          "qty": 50 
        },
        {
          "id": 4,
          "qty": 2 
        }
      ]
    },
    {
      "user_id": 2,
	    "date_of_service": "2021-10-03T05:00:00.000Z", 
      "products": [ 
        {
          "id": 1,
          "qty": 50 
        },
        {
          "id": 4,
          "qty": 2 
        }
      ]
    }
  ]

  beforeEach( async() => {
    await Service.destroy({
      where:{}
    })

    const insertService1 = new Service(initialService[0])
    insertService1.save()

    const insertService2 = new Service(initialService[1])
    insertService2.save()

    const insertService3 = new Service(initialService[2])
    insertService3.save()
  })

  test('GET    a /api/service is json ', async() => {
    await api
      .get('/api/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  })

  test('GET    a /api/service count data  ', async() => {
    const resp = await api.get('/api/service')
    expect(resp.body.msg).toBe('get Services Controller');
    expect(resp.body.total).toBe(initialService.length);
  }) 
  
  test('POST   a /api/user User Created', async() => {
    const newService = {
      "user_id": 10,
      "date_of_service": "2021-10-24T05:00:00.000Z", 
      "products": [ 
        {
          "id": 1,
          "qty": 12 
        },
        {
          "id": 3,
          "qty": 5 
        }
      ]
    }
    const resp = await api.post('/api/service').send(newService)
    expect(resp.body.msg).toBe('Service Created')    
  })

  afterAll(async ()=>{
    await server.closed()
    await server.closedDbConnection()
  })
})