import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: String, default: 'Anonymous' }
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    votes: { type: Number, default: 0 },
    isAnswered: { type: Boolean, default: false },
    replies: [ReplySchema]
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
