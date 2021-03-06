import type { NextApiRequest, NextApiResponse } from 'next';

import { Document } from 'mongoose';

import connectDB from 'backend/utils/connectDB';
import userModel, { UserModelType } from 'backend/models/user.model';
import getUserId from 'backend/utils/getUserId';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { term } = req.query;
  const _id = getUserId(req);

  try {
    const userWithEmail = await userModel
      .findOne({ email: term })
      .select('-email');

    if (!Array.isArray(term)) {
      term = term.split(' ');
    }

    term = term.join('|');
    const searchRgx = '.*' + term + '.*';

    let users = await userModel
      .find({
        $or: [
          { fName: { $regex: searchRgx, $options: 'i' } },
          { lName: { $regex: searchRgx, $options: 'i' } },
        ],
      })
      .select('-email');

    users = users.filter(
      (user: Document<any, any, UserModelType> & UserModelType) => {
        return !_id.equals(user._id);
      }
    );

    if (userWithEmail && !_id.equals(userWithEmail._id))
      return res.json([userWithEmail]);

    return res.json(users);
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
