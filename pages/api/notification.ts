import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import getUserId from 'backend/utils/getUserId';
import notificationModel from 'backend/models/notification.model';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    const notifications = await notificationModel
      .find({ to: _id })
      .limit(50)
      .populate({ path: 'who to', model: userModel });

    notifications.reverse();

    return res.json(notifications);
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
