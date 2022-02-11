import mongoose from 'mongoose';

interface LikeModelType {
  liker: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
}

const likeSchema = new mongoose.Schema<LikeModelType>({
  liker: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const likeModel =
  (mongoose.models.Like as mongoose.Model<LikeModelType>) ||
  mongoose.model<LikeModelType>('Like', likeSchema);

export default likeModel;
