import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const Challenge = new Schema({
  challengeId: {
    type: Schema.Types.Mixed,
    required: true
  },
  online: {
    type: Boolean,
    required: true
  },
  browserId: {
    type: Schema.Types.Mixed,
    required: true
  },
  sessionId: {
    type: Schema.Types.Mixed,
    required: true
  },
  userId: {
    type: Schema.Types.Mixed,
    required: true
  },
}, {
  timestamps: true // (client side)
})

export default mongoose.model('Challenge', Challenge)