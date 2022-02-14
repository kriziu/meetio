import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/middlewares/connectDB';
import getUserId from 'backend/middlewares/getUserId';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);
  const { ids } = req.body;

  try {
    console.log(ids);

    return res.json({});
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
