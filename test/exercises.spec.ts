import describeApi from './describeApi'
import { matchBody, session } from './utils'
import Solution from '../src/models/solution'
import Challenge from '../src/models/challenge'

describeApi('Challenges', (request) => {
  
  test('Create challenge', () =>
    request().post('/challenges')
      .send(challengeJson)
      .expect(200)
      .then(matchBody(challengeJson))
  )

  test('Create solution', () =>
    request().post('/solutions')
      .send(solutionJson)
      .expect(200)
      .then(matchBody(solutionJson))
  )

  test('Create solution should update last challenge', async () => {
    await Challenge.create(challengeJson)
    const newChallengeJson = { ...challengeJson }
    newChallengeJson.session.timestamp = new Date().toISOString()
    await Challenge.create(newChallengeJson)
    await request().post('/solutions')
      .send(solutionJson)
      .expect(200)
    const [firstChallenge, secondChallenge] = await Challenge.find({ challengeId })
    expect(firstChallenge.firstSolution).toBeFalsy()
    expect(secondChallenge.firstSolution).toBeTruthy()
  })

  test('Create solution should update last challenge only once', async () => {
    const solution = await Solution.create(solutionJson)
    const newChallengeJson = { ...challengeJson, firstSolution: solution }
    await Challenge.create(newChallengeJson)
    await request().post('/solutions')
      .send(solutionJson)
      .expect(200)
    const challenge = await Challenge.findOne({ challengeId })
    expect(challenge.firstSolution).toEqual(solution._id)
  })

  test('Update solution with execution results', async () => {
    const { solutionId } = await Solution.create(solutionJson)
    return request().put(`/solutions/${solutionId}`)
      .send(executionResultJson)
      .expect(200)
      .then(matchBody({ ...solutionJson, ...executionResultJson }))
  })

})


const solutionId = "007"

const challengeId = "1"

const challengeJson = {
  challengeId,
  session
}

const solutionJson = {
  challengeId,
  solutionId,
  program: "XML",
  ast: [],
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