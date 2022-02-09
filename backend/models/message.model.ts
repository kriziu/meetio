import mongoose from 'mongoose';

interface MessageModelType {
  administrate?: boolean;
  message: string;
  connectionId: string;
  date: Date;
  pin: boolean;
  _id: string;
  deleted: boolean;
  sender: mongoose.Types.ObjectId;
  read: mongoose.Types.ObjectId[];
}

const messageSchema = new mongoose.Schema<MessageModelType>({
  connectionId: {
    type: String,
    required: true,
  },
  administrate: {
    type: Boolean,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  read: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  pin: {
    type: Boolean,
    required: true,
    default: false,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const messageModel =
  (mongoose.models.Message as mongoose.Model<MessageModelType>) ||
  mongoose.model<MessageModelType>('Message', messageSchema);

export default messageModel;
