import * as mongoose from 'mongoose'
import { SESSION_FIELD } from './utils'
const Schema = mongoose.Schema

const ChallengeSchema = new Schema({
  challengeId: {
    type: Schema.Types.Mixed,
    required: true
  },
  firstSolution: Schema.Types.ObjectId,
  session: SESSION_FIELD
})


interface ChallengeDoc extends mongoose.Document {
  challengeId: any,
  firstSolution?: any,
  session: any //TODO
}

export default mongoose.model<ChallengeDoc>('Challenge', ChallengeSchema)