import * as mongoose from 'mongoose'
import { SESSION_FIELD } from './utils'
const Schema = mongoose.Schema

const SolutionSchema = new Schema({
  solutionId: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true
  },
  challengeId: {
    type: Schema.Types.Mixed,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  staticAnalysis: {
    couldExecute: {
      type: Boolean,
      required: true
    }
  },
  executionResult: {
    isTheProblemSolved: Boolean,
    stoppedByUser: Boolean,
    error: Schema.Types.Mixed,
  },
  session: SESSION_FIELD
})

interface Solution extends mongoose.Document {
  program: string,
  solutionId: any,
  challengeId: any,
  session: any
}

export default mongoose.model<Solution>('Solution', SolutionSchema)