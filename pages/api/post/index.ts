import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import getUserId from 'backend/utils/getUserId';
import postModel from 'backend/models/post.model';
import userModel from 'backend/models/user.model';
import likeModel from 'backend/models/like.model';
import connectionModel from 'backend/models/connection.model';

// KOMENTARZE (pisanie)
// FOR YOU PAGE
// OGOLNE TESTY ITD

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    switch (req.method) {
      case 'GET':
        const { author } = req.query;

        const connection = await connectionModel.findOne({
          $or: [{ users: [_id, author] }, { users: [author, _id] }],
          group: false,
        });

        let postsDB;

        if (connection || _id.toString() === author)
          postsDB = await postModel
            .find({ author })
            .populate({ path: 'author', model: userModel });
        else
          postsDB = await postModel
            .find({ author, isPublic: true })
            .populate({ path: 'author', model: userModel });

        const posts: PostType[] = [];

        for (const post of postsDB) {
          const likes = await likeModel.find({ postId: post._id }).count();

          !post.toObject().parentPost &&
            posts.unshift({ ...(post as any).toObject(), likes });
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
