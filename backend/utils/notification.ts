import { Schema, Types } from 'mongoose';
import notificationModel from 'backend/models/notification.model';

export const createNotification = async (
  who: Types.ObjectId,
  to: Types.ObjectId | Schema.Types.ObjectId,
  postId: Types.ObjectId | string,
  type: 'like' | 'mention' | 'reply' | 'comment'
) => {
  const newNotification = new notificationModel({
    date: new Date(),
    type,
    who,
    to,
    postId,
  });

  await newNotification.save();
};
