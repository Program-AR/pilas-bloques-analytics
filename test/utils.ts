import * as express from 'express'
import * as Request from 'supertest'
import * as mongoose from 'mongoose'
import router from '../src/routes'

export type Request = Request.SuperTest<Request.Test>

export const createServer = async () => {
  await connectDB()
  await dropDB()
  const app = express()
  app.use(router)
  return Request(app)
}

export const connectDB = async () => {
  await mongoose.connect('mongodb://localhost/pilas-bloques-analytics-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

export const dropDB = () => mongoose.connection.dropDatabase()
export const disconnectDB = () => mongoose.disconnect()

export const flushDB = () => {
  mongoose.modelNames().forEach(model => mongoose.deleteModel(model))
}