import { NextApiResponse } from 'next';

export const sendError = (err: unknown, res: NextApiResponse<any>) => {
  const msg = (err as Error).message;
  console.log(msg);
  if (msg) return res.status(500).send({ error: msg });
  return res.status(500).end();
};
