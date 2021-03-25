import * as mongoose from 'mongoose'
import { CONTEXT_FIELDS, DocumentOf } from './utils'
import { SolutionDoc } from './solution'
const Schema = mongoose.Schema

const CHALLENGE_FIELDS = {
  challengeId: {
    type: Schema.Types.Mixed,
    required: true
  },
  firstSolution: {
    type: Schema.Types.ObjectId
  },
  context: CONTEXT_FIELDS,
  timestamp: {
    type: Date,
    required: true
  },
}

const repository = {
  setFirstSolution: async function (this: mongoose.Model<ChallengeDoc>, challengeId: any, contextId: any, solution: SolutionDoc) {
    const challenge = await this.findOne({ challengeId, 'context.id': contextId }).sort({ 'timestamp': -1 })
    if (challenge && !challenge.firstSolution) {
      challenge.firstSolution = solution
      return challenge.save()
    }
  }
}

const ChallengeSchema = new Schema(CHALLENGE_FIELDS)
ChallengeSchema.statics = repository

interface ChallengeDoc extends DocumentOf<typeof CHALLENGE_FIELDS> {
  firstSolution?: SolutionDoc
}

type ChallengeModel = mongoose.Model<ChallengeDoc> & typeof repository

export default mongoose.model<ChallengeDoc, ChallengeModel>('Challenge', ChallengeSchema)