import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import followModel from 'backend/models/follow.model';
import getUserId from 'backend/utils/getUserId';
import userModel from 'backend/models/user.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);
  const { who } = req.body;

  try {
    switch (req.method) {
      case 'GET':
        const { profile, userId } = req.query;

        if (profile && userId) {
          const followers = await followModel
            .find({ who: userId })
            .populate({ path: 'follower', model: userModel });

          if (!followers) return res.status(404).end();

          return res.json(followers.map(follower => follower.follower));
        }

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
        const followToDelete = await followModel.findOne({
          who,
          follower: _id,
        });

        if (!userToFollow) return res.status(404).end();

        let followed = 0;

        if (followToDelete) {
          await followToDelete?.delete();
          followed = await followModel.find({ who }).count();

          return res.json({ ...userToFollow.toObject(), followed });
        }

        const newFollow = new followModel({
          follower: _id,
          who: userToFollow._id,
        });

        await newFollow.save();
        followed = await followModel.find({ who }).count();

        return res.json({ ...userToFollow.toObject(), followed });

      case 'DELETE':
        const me = await userModel.findById(_id);

        if (!me) return res.status(404).end();

        const { followerId } = req.body;
        await followModel.findOneAndDelete({ who: _id, follower: followerId });

        return res.end();
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
