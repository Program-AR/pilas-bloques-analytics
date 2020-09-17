import { createServer, Request, dropDB, disconnectDB, matchBody, session } from './utils'
import Solution from '../src/models/solution'

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


  test('Create challenge', () =>
    request.post('/challenges')
      .send(challengeJson)
      .expect(200)
      .then(matchBody(challengeJson))
  )

  test('Create solution', () =>
    request.post('/solutions')
      .send(solutionJson)
      .expect(200)
      .then(matchBody(solutionJson))
  )

  test('Update solution with execution results', async () => {
    await Solution.create(solutionJson)
    return request.put(`/solutions/${solutionId}`)
      .send(executionResultJson)
      .expect(200)
      .then(matchBody({ ...solutionJson, ...executionResultJson }))
  })
})

const solutionId = "007"

const challengeJson = {
  challengeId: 1,
  session
}

const solutionJson = {
  challengeId: 1,
  solutionId,
  program: "XML",
  staticAnalysis: {
    couldExecute: true
  },
  session
}

const executionResultJson = {
  executionResult: {
    isTheProblemSolved: true,
  }
}