import Challenge from '../models/challenge'
import Solution from '../models/solution'
import * as express from 'express'
import { syncHandler, ResourceRequest } from './utils'
import { EntityNotFound } from './errorHandlers'

type ChallengeRequest = ResourceRequest<'solution'>

const router = express.Router()

router.param('solutionId', async (req: ChallengeRequest, res, next, id) => {
  const solution = await Solution.findOne({ solutionId: id })
  if (!solution) return next(new EntityNotFound('Solution', id))
  req.solution = solution
  next()
})

router.post('/challenges', syncHandler(async (req: ChallengeRequest, res) => {
  const challenge = await Challenge.create(req.body)
  res.json(challenge)
}))

router.post('/solutions', syncHandler(async (req: ChallengeRequest, res) => {
  const solution = await Solution.create(req.body)
  const { challengeId, context: { id } } = solution
  await Challenge.setFirstSolution(challengeId, id, solution)
  res.json(solution)
}))

router.put('/solutions/:solutionId', syncHandler(async (req: ChallengeRequest, res) => {
  req.solution.set(req.body)
  await req.solution.save()
  res.json(req.solution)
}))

export default router