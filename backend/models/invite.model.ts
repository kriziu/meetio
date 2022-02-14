import mongoose from 'mongoose';

interface InviteModelType {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  date: Date;
  read: boolean;
}

const inviteSchema = new mongoose.Schema<InviteModelType>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const inviteModel =
  (mongoose.models.Invite as mongoose.Model<InviteModelType>) ||
  mongoose.model<InviteModelType>('Invite', inviteSchema);

export default inviteModel;
