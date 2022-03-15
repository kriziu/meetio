import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import followModel from 'backend/models/follow.model';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;

  try {
    const user = await userModel.findById(_id);

    const userFollowers = await followModel.find({ who: _id }).count();

    if (!user) {
      return res.status(404).end();
    }

    const userReturned: UserType = {
      ...user.toObject(),
      followed: userFollowers,
    };

    return res.status(200).json(userReturned);
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
