import mongoose, { ObjectId } from 'mongoose';

export type PostModelType = Omit<PostType, 'author' | 'comments'> & {
  author: ObjectId;
  comments: ObjectId[];
};

const postSchema = new mongoose.Schema<PostModelType>({
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  isPublic: { type: Boolean, required: true },
  content: { type: String, required: true },
  imageURLs: [{ type: String, required: true }],
  likes: { type: Number, required: true, default: 0 },
  commentsCount: { type: Number, required: true, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
});

const postModel =
  (mongoose.models.Post as mongoose.Model<PostModelType>) ||
  mongoose.model<PostModelType>('Post', postSchema);

export default postModel;
