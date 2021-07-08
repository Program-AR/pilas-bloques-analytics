import describeApi from './describeApi'
import { matchBody } from './utils'
import { UserModel } from 'pilas-bloques-models'
import { User } from 'pilas-bloques-models'

describeApi('Users', (request) => {

  beforeEach(() => UserModel.create(user as User))

  test('Create', () =>
    request().post('/users')
      .send(user)
      .expect(200)
      .then(matchBody({ userId: "RANDOM" }))
  )

  test('Required error', () =>
    request().post('/users')
      .send({})
      .expect(400, 'Path `userId` is required.')
  )

  test.skip('Unique error', () =>
    request().post('/users')
      .send({ userId: username })
      .expect(400, 'Duplicate key error.')
  )

  test('Get', () =>
    request().get(`/users/${username}`)
      .expect(200)
      .then(matchBody({ userId: username }))
  )

  test('Not found error', () =>
    request().get(`/users/0`)
      .expect(404, 'User(0) not found.')
  )

  test('Update', () =>
    request().put(`/users/${username}`)
      .send({ userId: "OTHER" })
      .expect(200)
      .then(matchBody({ userId: "OTHER" }))
  )

})

const username = "TEST_ID"

const user: Partial<User> = {
  username,
  salt: 'asd',
  hashedPassword: 'Dvl9i34mkvgoi',
  parentName: 'Pepita',
  parentDNI: '123546345'
}