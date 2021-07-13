import describeApi from './describeApi'
import { matchBody, challengeJson, solutionJson, executionResultJson } from './utils'
import { CompleteSolutionModel } from 'pilas-bloques-models'
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
    const [firstChallenge, secondChallenge] = await ChallengeModel.find({ challengeId: challengeJson.challengeId })
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
    const challenge = await ChallengeModel.findOne({ challengeId: challengeJson.challengeId })
    expect(challenge.firstSolution).toEqual(solution._id)
  })

  test('Update solution with execution results', async () => {
    const { solutionId } = await CompleteSolutionModel.create(solutionJson)
    const newExecutionResult = { ...executionResultJson, isTheProblemSolved: false, error: "¡Acá no hay churrasco!" }
    return request().put(`/solutions/${solutionId}`)
      .send({ executionResult: newExecutionResult })
      .expect(200)
      .then(matchBody({ ...solutionJson, executionResult: newExecutionResult }))
  })

})


