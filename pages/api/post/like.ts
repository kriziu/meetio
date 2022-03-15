import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import getUserId from 'backend/utils/getUserId';
import postModel from 'backend/models/post.model';
import likeModel from 'backend/models/like.model';
import userModel from 'backend/models/user.model';
import notificationModel from 'backend/models/notification.model';
import { createNotification } from 'backend/utils/notification';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    if (req.method === 'GET') {
      const likedPosts = await likeModel.find({ liker: _id }).populate({
        path: 'postId',
        model: postModel,
        populate: { path: 'author', model: userModel },
      });

      const posts: PostType[] = [];

      for (const post of likedPosts.map(liked =>
        (liked.postId as any).toObject()
      )) {
        const likes = await likeModel.find({ postId: post._id }).count();
        posts.unshift({ ...post, likes });
      }

      return res.json(posts);
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

      if (!_id.equals(postToLike.author as any)) {
        await createNotification(
          _id,
          postToLike.author,
          postToLike._id,
          'like'
        );
      }

      return res.json(postToLike);
    }

    await like.delete();

    return res.json(postToLike);
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
