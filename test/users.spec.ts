import * as Supertest from 'supertest'
import { createServer, Request, dropDB, flushDB, disconnectDB } from './utils'
import user from '../src/models/user'

const matchBody = (expected: any) => (res: Supertest.Response) => {
  expect(res.body).toMatchObject(expected)
}

describe('Users', () => {
  let request: Request
  const USER_ID = "TEST_ID"

  beforeAll(async () => {
    request = await createServer()
  })
  
  beforeEach(async () => {
    await dropDB()
    await user.create({ userId: USER_ID })
    flushDB()
  })

  afterAll(async () => {
    await disconnectDB()
  })

  test('Create', () =>
    request.post('/users')
      .send({ userId: "RANDOM" })
      .expect(200)
      .then(matchBody({ userId: "RANDOM" }))
  )

  test('Required error', () => 
    request.post('/users')
      .send({})
      .expect(400, 'Path `userId` is required.')
  )

  test.skip('Unique error', () =>
    request.post('/users')
      .send({ userId: USER_ID })
      .expect(400, 'Duplicate key error.')
  )

  test('Get', () =>
    request.get(`/users/${USER_ID}`)
      .expect(200)
      .then(matchBody({ userId: USER_ID }))
  )

  test('Not found error', () =>
    request.get(`/users/0`)
      .expect(404, 'User(0) not found.')
  )

  test('Update', () =>
    request.put(`/users/${USER_ID}`)
      .send({ userId: "OTHER" })
      .expect(200)
      .then(matchBody({ userId: "OTHER" }))
  )


})