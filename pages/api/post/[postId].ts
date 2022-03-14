import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import postModel from 'backend/models/post.model';
import likeModel from 'backend/models/like.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;

  try {
    const post = await postModel
      .findById(postId)
      .populate({ path: 'comments', model: postModel })
      .populate({ path: 'author', model: userModel });

    if (!post) {
      return res.status(404).end();
    }

    await post.populate({ path: 'comments.author', model: userModel });

    const likes = await likeModel.find({ postId: postId }).count();

    const comments = [];

    for (const comment of post.comments) {
      const likes = await likeModel
        .find({ postId: (comment as any)._id })
        .count();

      comments.push({ ...(comment as any).toObject(), likes });
    }

    return res.status(200).json({ ...post.toObject(), likes, comments });
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
