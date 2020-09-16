import * as mongoose from 'mongoose'
import { SESSION_FIELD } from './utils'
const Schema = mongoose.Schema

const Challenge = new Schema({
  challengeId: {
    type: Schema.Types.Mixed,
    required: true
  },
  session: SESSION_FIELD
})

export default mongoose.model('Challenge', Challenge)