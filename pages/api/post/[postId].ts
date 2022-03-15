import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import postModel from 'backend/models/post.model';
import likeModel from 'backend/models/like.model';
import connectionModel from 'backend/models/connection.model';
import getUserId from 'backend/utils/getUserId';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;
  const _id = getUserId(req);

  try {
    const post = await postModel
      .findById(postId)
      .populate({ path: 'comments', model: postModel });

    if (!post) return res.status(404).end();

    const connection = await connectionModel.findOne({
      $or: [{ users: [_id, post.author] }, { users: [post.author, _id] }],
      group: false,
    });

    if (
      !connection &&
      !post.isPublic &&
      post.author.toString() !== _id.toString()
    )
      return res.status(403).end();

    await post.populate({ path: 'author', model: userModel });

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
    return sendError(err, res);
  }
};

export default connectDB(handler);
