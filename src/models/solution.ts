import * as mongoose from 'mongoose'
import { SESSION_FIELD } from './utils'
const Schema = mongoose.Schema

const Solution = new Schema({
  solutionId: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true
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
}, {
  timestamps: true
})

export default mongoose.model('Solution', Solution)