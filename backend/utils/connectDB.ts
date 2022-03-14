import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const { DB_PASS } = process.env;

const connectDB =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse
    ) => Promise<void | NextApiResponse<any>>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(
        `mongodb+srv://root:${DB_PASS}@main.hkwom.mongodb.net/chamee?retryWrites=true&w=majority`,
        () => console.log('Connected to database')
      );
    }

    return handler(req, res);
  };

export default connectDB;
