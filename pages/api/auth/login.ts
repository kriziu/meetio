import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import { generateRefresh, week } from 'common/lib/generateTokens';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).end();
    }

    if (await bcrypt.compare(password, user.password)) {
      const { fName, lName, _id, email, imageURL } = user;
      const token = generateRefresh({
        fName,
        lName,
        _id,
        email,
        imageURL,
        followed: 0,
      });

      return res
        .setHeader(
          'Set-Cookie',
          `REFRESH=${token};HttpOnly;Path=/;expires=${week};`
        )
        .status(200)
        .end();
    }

    return res.status(403).end();
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
