import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import getUserId from 'backend/utils/getUserId';
import postModel from 'backend/models/post.model';
import userModel from 'backend/models/user.model';
import likeModel from 'backend/models/like.model';

// loader jak sie daje like przy polubieniu w details post
// KOMENTARZE (pisanie)
// WIDOCZNOSC POSTOW
// FOR YOU PAGE
// OGOLNE TESTY ITD

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    switch (req.method) {
      case 'GET':
        const { author } = req.query;

        const postsDB = await postModel
          .find({ author })
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
