import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/middlewares/connectDB';
import followModel from 'backend/models/follow.model';
import getUserId from 'backend/middlewares/getUserId';
import userModel from 'backend/models/user.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);
  const { who } = req.body;

  try {
    switch (req.method) {
      case 'GET':
        const followers = await followModel
          .find({ who: _id })
          .populate({ path: 'follower', model: userModel });
        const follows = await followModel
          .find({ follower: _id })
          .populate({ path: 'who', model: userModel });

        const mine = followers.map(follower => follower.follower);
        const notMine = follows.map(follower => follower.who);

        return res.json({ mine, notMine });

      case 'POST':
        const userToFollow = await userModel.findById(who);

        if (!userToFollow) return res.status(404).end();

        const newFollow = new followModel({
          follower: _id,
          who: userToFollow._id,
        });

        await newFollow.save();

        return res.json(newFollow);

      case 'DELETE':
        const followToDelete = await followModel.findOne({ who });

        await followToDelete?.delete();

        return res.json(followToDelete);
    }

    return res.end();
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
