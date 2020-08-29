import * as express from 'express'
import serverErrorHandler from './errorHandlers'
import users from './users'

const router = express.Router()

router.use(express.json())
router.all('/ping', (_, res) => res.send('pong'))
router.use(users)
router.use(serverErrorHandler)

export default router