import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/middlewares/connectDB';
import getUserId from 'backend/middlewares/getUserId';
import postModel from 'backend/models/post.model';
import userModel from 'backend/models/user.model';
import likeModel from 'backend/models/like.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    switch (req.method) {
      case 'GET':
        const { author } = req.query;

        const posts = await postModel
          .find({ author })
          .populate({ path: 'author', model: userModel });

        posts.reverse();

        for (const post of posts) {
          const postLikes = await likeModel.find({ postId: post._id }).count();
          post.likes = postLikes;
        }

        return res.json(posts);

      case 'POST':
        const { content, isPublic, imageURLs } = req.body;

        const newPost = new postModel({
          content,
          isPublic,
          imageURLs,
          comments: [],
          author: _id,
        });

        await newPost.save();

        return res.json(newPost);
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
