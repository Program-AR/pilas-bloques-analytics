import Challenge from '../models/challenge'
import Solution from '../models/solution'
import * as express from 'express'
import { syncHandler } from './utils'
import { EntityNotFound } from './errorHandlers'
import * as mongoose from 'mongoose'

type ChallengeRequest = express.Request & { solution: mongoose.Document } //TODO: ResourceRequest<field>

const router = express.Router()

router.param('solutionId', async (req: ChallengeRequest, res, next, id) => {
  const solution = await Solution.findOne({ solutionId: id }).exec()
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
  res.json(solution)
}))

router.put('/solutions/:solutionId', syncHandler(async (req: ChallengeRequest, res) => {
  const solution = await req.solution.update(req.body)
  res.json(solution)
}))

export default router