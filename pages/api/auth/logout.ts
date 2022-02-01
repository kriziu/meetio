import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'backend/middlewares/connectDB';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res
      .setHeader('Set-Cookie', [
        'REFRESH=; HttpOnly; Path=/;',
        'ACCESS=; Path=/;',
      ])
      .status(200)
      .json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

export default connectDB(handler);
