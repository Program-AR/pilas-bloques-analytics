import * as express from 'express'
import * as cors from 'cors'
import serverErrorHandler from './errorHandlers'
import users from './users'
import exercises from './exercises'

const router = express.Router()

router.use(express.json())
router.use(cors())
router.all('/ping', (_, res) => res.send('pong'))
router.use(users)
router.use(exercises)
router.use(serverErrorHandler)

export default router