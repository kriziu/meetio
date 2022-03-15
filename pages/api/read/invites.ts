import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import getUserId from 'backend/utils/getUserId';
import inviteModel from 'backend/models/invite.model';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);
  const { ids } = req.body;

  try {
    const invites = await inviteModel
      .find({ _id: { $in: ids }, to: _id })
      .updateMany({ read: true });

    return res.json(invites);
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
