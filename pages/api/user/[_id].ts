import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/middlewares/connectDB';
import userModel from 'backend/models/user.model';
import followModel from 'backend/models/follow.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;

  try {
    const user = await userModel.findById(_id);

    const userFollowers = await followModel.find({ who: _id }).count();

    if (!user) {
      return res.status(404).end();
    }

    user.followed = userFollowers;

    return res.status(200).json(user);
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
