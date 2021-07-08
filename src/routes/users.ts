import * as express from 'express'
import { syncHandler, ResourceRequest } from './utils'
import { EntityNotFound } from './errorHandlers'
import { UserModel } from 'pilas-bloques-models'

type UserRequest = ResourceRequest<'user'>

const router = express.Router()

router.param('userId', async (req: UserRequest, res, next, id) => {
  const user = await UserModel.findOne({ userId: id }).exec()
  if (!user) return next(new EntityNotFound('User', id))
  req.user = user
  next()
})

router.get('/users/:userId', syncHandler(async (req: UserRequest, res) => {
  res.json(req.user)
}))

router.post('/users', syncHandler(async (req: UserRequest, res) => {
  const user = await UserModel.create(req.body)
  res.json(user)
}))

router.put('/users/:userId', syncHandler(async (req: UserRequest, res) => {
  req.user.set(req.body)
  await req.user.save()
  res.json(req.user)
}))

export default router