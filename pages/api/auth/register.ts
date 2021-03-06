import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
import connectDB from 'backend/utils/connectDB';
import userModel from 'backend/models/user.model';
import { generateRefresh, week } from 'common/lib/generateTokens';
import { sendError } from 'backend/utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, fName, lName } = req.body;

  try {
    const userWithEmail = await userModel.findOne({ email });
    if (userWithEmail) return res.status(409).end();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      email,
      password: hashedPassword,
      fName,
      lName,
      imageURL: '-1',
    });

    await user.save();

    const token = generateRefresh({
      fName,
      lName,
      _id: user._id,
      email,
      imageURL: '-1',
      followed: 0,
    });

    return res
      .setHeader(
        'Set-Cookie',
        `REFRESH=${token};HttpOnly;Path=/;expires=${week};`
      )
      .status(201)
      .end();
  } catch (err) {
    return sendError(err, res);
  }
};

export default connectDB(handler);
