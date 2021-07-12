import describeApi from './describeApi'
import { matchBody, context } from './utils'
import { CompleteSolutionModel } from 'pilas-bloques-models'
import { ChallengeModel } from 'pilas-bloques-models'
import { CompleteSolution } from 'pilas-bloques-models'

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
    const solution = await CompleteSolutionModel.create(solutionJson)
    const newChallengeJson = { ...challengeJson, firstSolution: solution }
    await ChallengeModel.create(newChallengeJson)
    await request().post('/solutions')
      .send(solutionJson)
      .expect(200)
    const challenge = await ChallengeModel.findOne({ challengeId })
    expect(challenge.firstSolution).toEqual(solution._id)
  })

  test('Update solution with execution results', async () => {
    const { solutionId } = await CompleteSolutionModel.create(solutionJson)
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
  error: '' as any
}

const solutionJson: CompleteSolution = {
  challengeId,
  solutionId,
  program: "XML",
  ast: '123asd',
  staticAnalysis: {
    couldExecute: true
  },
  context,
  timestamp: new Date().toISOString(),
  turboModeOn: false,
  executionResult: executionResultJson,
  user: {
    _id: '53cb6b9b4f4ddef1ad47f943',
    username: 'pepita',
    salt: 'asd',
    hashedPassword: 'Dvl9i34mkvgoi',
    parentName: 'Pepita',
    parentDNI: '123546345',
    answers: [],
    profile: {
      nickName: 'pepitaLaGenia',
      avatarURL: 'pepita.png'
    },
    answeredQuestionIds: [1, 2, 3, 4]
  }
}