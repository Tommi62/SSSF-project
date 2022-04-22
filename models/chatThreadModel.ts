import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatThreadSchema = new Schema({
  name: {type: String, required: true},
  private: {type: Boolean, required: true},
  creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('ChatThread', chatThreadSchema);