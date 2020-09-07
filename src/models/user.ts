import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  userId: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

export default mongoose.model('User', User)