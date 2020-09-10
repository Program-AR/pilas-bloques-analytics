import { createServer, Request, dropDB, disconnectDB, matchBody } from './utils'

describe('Challenges', () => {
  let request: Request

  beforeAll(async () => {
    request = await createServer()
  })

  beforeEach(async () => {
    await dropDB()
  })

  afterAll(async () => {
    await disconnectDB()
  })

  const json = {
    challengeId: 1,
    online: true,
    browserId: 123,
    sessionId: "HASH",
    userId: 123
  }

  test('Create', () =>
    request.post('/challenges')
      .send(json)
      .expect(200)
      .then(matchBody(json))
  )

})