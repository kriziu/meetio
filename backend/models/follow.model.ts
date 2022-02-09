import mongoose from 'mongoose';

interface FollowModelType {
  follower: mongoose.Types.ObjectId;
  who: mongoose.Types.ObjectId;
  date: Date;
}

const followSchema = new mongoose.Schema<FollowModelType>({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  who: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const followModel =
  (mongoose.models.Follow as mongoose.Model<FollowModelType>) ||
  mongoose.model<FollowModelType>('Follow', followSchema);

export default followModel;
