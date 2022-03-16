import mongoose, { ObjectId } from 'mongoose';

export type PostModelType = Omit<
  PostType,
  'author' | 'comments' | 'likes' | 'commentsCount' | 'parentPost'
> & {
  author: ObjectId;
  comments: ObjectId[];
  parentPost: ObjectId | null;
};

const postSchema = new mongoose.Schema<PostModelType>({
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  isPublic: { type: Boolean, required: true },
  content: { type: String, required: true },
  imageURLs: [{ type: String, required: true }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  parentPost: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, required: true },
});

const postModel =
  (mongoose.models.Post as mongoose.Model<PostModelType>) ||
  mongoose.model<PostModelType>('Post', postSchema);

export default postModel;
