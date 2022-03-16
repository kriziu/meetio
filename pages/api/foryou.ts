import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import getUserId from 'backend/utils/getUserId';
import { sendError } from 'backend/utils/error';
import followModel from 'backend/models/follow.model';
import postModel from 'backend/models/post.model';
import connectionModel from 'backend/models/connection.model';
import likeModel from 'backend/models/like.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    const user = await userModel.findById(_id);
    if (!user) return res.status(404).end();

    let tempPosts;

    const followed = await followModel.find({ follower: _id });
    const postsFromFollowed = [];
    for (const follower of followed) {
      tempPosts = await postModel
        .find({
          author: follower.who,
          isPublic: true,
          parentPost: { $exists: false },
        })
        .sort({ date: -1 })
        .limit(10);

      postsFromFollowed.push(...tempPosts);
    }

    const connections = await connectionModel.find({
      users: _id,
      group: false,
    });
    const friends = connections.map(connection => {
      return connection.users.find(user => !user.equals(_id));
    });
    const postsFromFriends = [];
    for (const friend of friends) {
      tempPosts = await postModel
        .find({ author: friend, parentPost: { $exists: false } })
        .sort({ date: -1 })
        .limit(10);

      postsFromFriends.push(...tempPosts);
    }

    const connectedPosts = [...postsFromFollowed, ...postsFromFriends];

    connectedPosts.sort((a, b) => {
      if (a.date > b.date) return -1;
      return 1;
    });

    const seen = new Set();
    const filteredPosts = connectedPosts.filter(post => {
      const duplicate = seen.has(post._id.toString());
      seen.add(post._id.toString());
      return !duplicate;
    });

    const finalPosts = [];

    for (const post of filteredPosts) {
      const likes = await likeModel.find({ postId: post._id }).count();

      await post.populate({ path: 'author', model: userModel });

      finalPosts.unshift({ ...post.toObject(), likes });
    }

    return res.json(finalPosts);
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
