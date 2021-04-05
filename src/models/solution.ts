import * as mongoose from 'mongoose'
import { CONTEXT_FIELDS, DocumentOf, Nullable } from './utils'
const Schema = mongoose.Schema

const SOLUTION_FIELDS = {
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
  ast: {
    type: Schema.Types.Mixed,
    required: true
  },
  staticAnalysis: {
    couldExecute: {
      type: Boolean,
      required: true
    }
  },
  executionResult: {
    isTheProblemSolved: {
      type: Boolean
    },
    stoppedByUser: {
      type: Boolean
    },
    error: {
      type: Schema.Types.Mixed
    },
  },
  context: CONTEXT_FIELDS,
  timestamp: {
    type: Date,
    required: true
  },
  turboModeOn: {
    type: Boolean,
    required: true
  },
}

const SolutionSchema = new Schema(SOLUTION_FIELDS)

export type SolutionDoc = Nullable<DocumentOf<typeof SOLUTION_FIELDS>, 'executionResult'>

export default mongoose.model<SolutionDoc>('Solution', SolutionSchema)