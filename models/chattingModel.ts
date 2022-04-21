import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chattingSchema = new Schema({
  thread: { type: mongoose.Types.ObjectId, ref: 'ChatThread', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

chattingSchema.index({
    thread: 1,
    user: 1,
  }, {
    unique: true,
  });

export default mongoose.model('Chatting', chattingSchema);