import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SESSION_FIELD = {
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
  timestamp: {
    type: Date,
    required: true
  },
}