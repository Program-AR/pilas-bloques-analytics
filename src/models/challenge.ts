import * as mongoose from 'mongoose'
import { SESSION_FIELDS, DocumentOf } from './utils'
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
  session: SESSION_FIELDS
}

const ChallengeSchema = new Schema(CHALLENGE_FIELDS)

interface ChallengeDoc extends DocumentOf<typeof CHALLENGE_FIELDS> {
  firstSolution?: SolutionDoc
}

export default mongoose.model<ChallengeDoc>('Challenge', ChallengeSchema)