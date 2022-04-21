import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  contents: { type: String, required: true },
  timestamp: { type: String, required: true },
  status: { type: String, default: 'unseen' },
  thread: { type: mongoose.Types.ObjectId, ref: 'ChatThread', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Message', messageSchema);