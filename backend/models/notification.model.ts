import mongoose from 'mongoose';

export type NotificationModelType = Omit<NotificationType, 'who' | 'to'> & {
  who: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
};

const notificationSchema = new mongoose.Schema<NotificationModelType>({
  date: { type: Date, required: true, default: new Date() },
  type: {
    type: String,
    required: true,
    enum: ['like', 'mention', 'reply', 'comment'],
  },
  who: { type: mongoose.Types.ObjectId, required: true },
  to: { type: mongoose.Types.ObjectId, required: true },
  read: { type: Boolean, required: true, default: false },
});

const notificationModel =
  (mongoose.models.Notification as mongoose.Model<NotificationModelType>) ||
  mongoose.model<NotificationModelType>('Notification', notificationSchema);

export default notificationModel;
