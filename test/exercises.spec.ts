import describeApi from './describeApi'
import { matchBody, context } from './utils'
import { SolutionModel } from 'pilas-bloques-models'
import { ChallengeModel } from 'pilas-bloques-models'

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
    await ChallengeModel.create(challengeJson)
    const newChallengeJson = { ...challengeJson }
    newChallengeJson.context.timestamp = new Date().toISOString()
    await ChallengeModel.create(newChallengeJson)
    await request().post('/solutions')
      .send(solutionJson)
      .expect(200)
    const [firstChallenge, secondChallenge] = await ChallengeModel.find({ challengeId })
    expect(firstChallenge.firstSolution).toBeFalsy()
    expect(secondChallenge.firstSolution).toBeTruthy()
  })

  test('Create solution should update last challenge only once', async () => {
    const solution = await SolutionModel.create(solutionJson)
    const newChallengeJson = { ...challengeJson, firstSolution: solution }
    await ChallengeModel.create(newChallengeJson)
    await request().post('/solutions')
      .send(solutionJson)
      .expect(200)
    const challenge = await ChallengeModel.findOne({ challengeId })
    expect(challenge.firstSolution).toEqual(solution._id)
  })

  test('Update solution with execution results', async () => {
    const { solutionId } = await SolutionModel.create(solutionJson)
    return request().put(`/solutions/${solutionId}`)
      .send(executionResultJson)
      .expect(200)
      .then(matchBody({ ...solutionJson, ...executionResultJson }))
  })

})


const solutionId = "007"

const challengeId = "1"

const challengeJson = {
  firstSolution: '123',
  challengeId,
  context,
}

const executionResultJson = {
  isTheProblemSolved: true,
  stoppedByUser: false,
  error: ''
}

const solutionJson = {
  challengeId,
  solutionId,
  program: "XML",
  ast: [],
  staticAnalysis: {
    couldExecute: true
  },
  context,
  timestamp: new Date().toISOString(),
  turboModeOn: false,
  executionResult: executionResultJson,
}