import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import getUserId from 'backend/utils/getUserId';
import postModel from 'backend/models/post.model';
import userModel from 'backend/models/user.model';
import likeModel from 'backend/models/like.model';
import connectionModel from 'backend/models/connection.model';
import { sendError } from 'backend/utils/error';
import { createNotification } from 'backend/utils/notification';

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
        const { content, isPublic, imageURLs, parentPost } = req.body;

        if (parentPost) {
          const postToComment = await postModel.findById(parentPost);
          if (!postToComment) return res.status(404).end();

          if (!postToComment.isPublic) {
            const connection = await connectionModel.findOne({
              $or: [
                { users: [_id, postToComment.author] },
                { users: [postToComment.author, _id] },
              ],
              group: false,
            });

            if (
              !connection &&
              _id.toString() !== postToComment.author.toString()
            )
              return res.status(403).end();
          }

          const newComment = new postModel({
            content,
            isPublic,
            imageURLs,
            comments: [],
            author: _id,
            parentPost,
            date: new Date(),
          });
          await newComment.save();

          if (postToComment.author.toString() !== _id.toString()) {
            if (postToComment.parentPost)
              await createNotification(
                _id,
                postToComment.author,
                newComment._id,
                'reply'
              );
            else
              await createNotification(
                _id,
                postToComment.author,
                newComment._id,
                'comment'
              );
          }

          await postToComment.updateOne({
            $push: { comments: newComment._id },
          });

          return res.json(newComment);
        }

        const newPost = new postModel({
          content,
          isPublic,
          imageURLs,
          comments: [],
          author: _id,
          date: new Date(),
        });

        await newPost.save();

        return res.json(newPost);
    }

    return res.end();
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
