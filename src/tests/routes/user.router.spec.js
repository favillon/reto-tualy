const { afterAll } = require('jest-circus')
const request = require('supertest')

const Server = require('../../models/server')
const User = require('../../models/user.model')

const server = new Server()

const api = request(server.app)
describe ('Test /api/user', () => {

  const initialUser = [
    {
      full_name : "Usuario 1",
      email : "user1@test.com"
    },
    {
      full_name : "Usuario 2",
      email : "user2@test.com"
    },
    {
      full_name : "Usuario 3",
      email : "user3@test.com"
    },
    {
      full_name : "Usuario 4",
      email : "user4@test.com"
    },
    {
      full_name : "Usuario 5",
      email : "user5@test.com"
    },
    {
      full_name : "Usuario 6",
      email : "user6@test.com",
      status: false
    }
  ]

  beforeEach( async() => {
    await User.destroy({
      where:{}
    })

    const insertUser1 = new User(initialUser[0])
    insertUser1.save()

    const insertUser2 = new User(initialUser[1])
    insertUser2.save()

    const insertUser3 = new User(initialUser[2])
    insertUser3.save()

    const insertUser4 = new User(initialUser[3])
    insertUser4.save()

    const insertUser5 = new User(initialUser[4])
    insertUser5.save()

    const insertUser6 = new User(initialUser[5])
    insertUser6.save()
  })

  test('GET    a /api/user is json ', async() => {
    await api
      .get('/api/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  })

  test('GET    a /api/user count data  ', async() => {
    const resp = await api.get('/api/user')
    expect(resp.body.msg).toBe('get User Controller');
    expect(resp.body.total).toBe(initialUser.length-1);
  })

  test('POST   a /api/user code 400', async() => {
    const newUser = {
      full_name : initialUser[0].full_name,
      email : initialUser[0].email
    }
    await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)
  })

  test('POST   a /api/user email repet 400', async() => {
    const newUser = {
      full_name : initialUser[0].full_name,
      email : initialUser[0].email
    }
    const resp = await api.post('/api/user').send(newUser)
    expect(resp.body.msg).toBe(`Ya existe un usuario con el email : ${newUser.email}`)
  })
  
  test('POST   a /api/user User Created', async() => {
    const newUser = {
      full_name : "test para usuario",
      email : "test@example.com"
    }
    const resp = await api.post('/api/user').send(newUser)
    expect(resp.body.msg).toBe('User Created')
    expect(resp.body.user.email).toBe(newUser.email)
  })

  test('PUT    a /api/user No existe usuario : 100', async() => {
    const newUser = {
      full_name : "test para usuario",
      email : "test@example.com"
    }
    const resp = await api.put('/api/user/100').send(newUser)
    expect(resp.body.msg).toBe(`No existe usuario : 100`)
  })

  test('PUT    a /api/user actualizacion nombre ', async() => {

    const resp = await api.get('/api/user')
    
    let updateUser = resp.body.users[0]
    updateUser.full_name = "test update name"
    
    const resp2 = await api.put(`/api/user/${updateUser.id}`).send(updateUser)
    expect(resp2.body.msg).toBe(`Usuario update`)
  })

  test('PUT    a /api/user validacion full_name ', async() => {

    const resp = await api.get('/api/user')
    
    let updateUser = resp.body.users[0]
    updateUser.full_name = ""
    
    const resp2 = await api.put(`/api/user/${updateUser.id}`).send(updateUser)
    expect(resp2.body.errors[0].msg).toBe(`Nombre completo es obligatorio`)
  })

  test('DELETE a /api/user validacion full_name ', async() => {

    const resp = await api.get('/api/user')
    
    let updateUser = resp.body.users[0]
    
    const resp2 = await api.delete(`/api/user/${updateUser.id}`).send(updateUser)
    expect(resp2.body.msg).toBe(`Usuario Delete`)
  })

  afterAll(async ()=>{
    await server.closed()
    await server.closedDbConnection()
  })
})