import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/middlewares/connectDB';
import getUserId from 'backend/middlewares/getUserId';
import postModel from 'backend/models/post.model';
import likeModel from 'backend/models/like.model';
import userModel from 'backend/models/user.model';
import notificationModel from 'backend/models/notification.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    if (req.method === 'GET') {
      const likedPosts = await likeModel.find({ liker: _id }).populate({
        path: 'postId',
        model: postModel,
        populate: { path: 'author', model: userModel },
      });

      return res.json(likedPosts.map(liked => liked.postId));
    }

    const { postId } = req.body;

    const like = await likeModel.findOne({ liker: _id, postId });

    const postToLike = await postModel.findById(postId);

    if (!postToLike) {
      return res.status(404).end();
    }

    if (!like) {
      const newLike = new likeModel({ liker: _id, postId });
      await newLike.save();

      // DODAC OSOBNA METODE DO ROBIENIA POWIADOMIEN ABY BYLA BARDZIEJ REUZYWALNA
      // POWIADOMIENIA SA OD NAJSTARSZEGO, nwm jak inne rzeczy typu invite wiec trzeba to sprawdzic, powinno byc od najnowszego na gorze do najstarszego
      const newNotification = new notificationModel({
        date: new Date(),
        type: 'like',
        who: _id,
        to: postToLike.author,
      });
      await newNotification.save();

      return res.json(postToLike);
    }

    await like.delete();

    return res.json(postToLike);
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
