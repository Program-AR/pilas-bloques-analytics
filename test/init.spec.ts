import { createServer, Request } from './utils'


describe('Server', () => {
  let request: Request

  beforeAll(async () => {
    request = await createServer()
  })

  test('is working', () =>
    request.get('/ping').expect(200, 'pong')
  )
})