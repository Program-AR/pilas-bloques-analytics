import User from '../models/user'
import * as express from 'express'
import * as mongoose from 'mongoose'
import { syncHandler } from './utils'
import { EntityNotFound } from './errorHandlers'

type UserRequest = express.Request & { user: mongoose.Document }

const router = express.Router()

router.param('userId', async (req: UserRequest, res, next, id) => {
  const user = await User.findOne({ userId: id }).exec()
  if (!user) return next(new EntityNotFound('User', id))
  req.user = user
  next()
})

router.get('/users/:userId', syncHandler(async (req: UserRequest, res) => {
  res.json(req.user)
}))

router.post('/users', syncHandler(async (req: UserRequest, res) => {
  const user = await User.create(req.body)
  res.json(user)
}))

router.put('/users/:userId', syncHandler(async (req: UserRequest, res) => {
  req.user.set(req.body)
  await req.user.save()
  res.json(req.user)
}))

export default router