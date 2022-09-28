import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Comments', CommentSchema);
