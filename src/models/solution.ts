import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const Solution = new Schema({
  solutionId: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true
  },
  //TODO: Session fields
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
  }
}, {
  timestamps: true
})

export default mongoose.model('Solution', Solution)