import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/middlewares/connectDB';
import getUserId from 'backend/middlewares/getUserId';
import postModel from 'backend/models/post.model';
import likeModel from 'backend/models/like.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    if (req.method === 'GET') {
      const likedPosts = await likeModel
        .find({ liker: _id })
        .populate({ path: 'postId', model: postModel });

      return res.json(likedPosts.map(liked => liked.postId));
    }

    const { postId } = req.body;

    const like = await likeModel.findOne({ liker: _id, postId });

    const postToLike = await postModel.findById(postId);

    if (!postToLike) {
      return res.status(404).end();
    }

    if (!like) {
      await postToLike.updateOne({ likes: postToLike.likes + 1 });
      postToLike.likes++;

      const newLike = new likeModel({ liker: _id, postId });
      await newLike.save();

      return res.json(postToLike);
    }

    await postToLike.updateOne({ likes: postToLike.likes - 1 });
    postToLike.likes--;

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
