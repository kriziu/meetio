import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import getUserId from 'backend/utils/getUserId';
import notificationModel from 'backend/models/notification.model';

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
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
