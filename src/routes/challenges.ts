import Challenge from '../models/challenge'
import * as express from 'express'
import { syncHandler } from './utils'

type ChallengeRequest = express.Request

const router = express.Router()

router.post('/challenges', syncHandler(async (req: ChallengeRequest, res) => {
  const challenge = await Challenge.create(req.body)
  res.json(challenge)
}))


export default router