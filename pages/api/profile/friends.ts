import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import connectionModel from 'backend/models/connection.model';
import userModel from 'backend/models/user.model';
import getUserId from 'backend/utils/getUserId';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    switch (req.method) {
      case 'DELETE':
        const { friendId } = req.body;

        const connectionToDelete = await connectionModel.findOne({
          $or: [{ users: [_id, friendId] }, { users: [friendId, _id] }],
          group: false,
        });

        console.log(connectionToDelete);

        await connectionToDelete?.delete();

        return res.json(connectionToDelete);

      default:
        const connections = await connectionModel
          .find({ users: _id, group: false })
          .populate({ path: 'users', model: userModel });

        const friends = connections.map(connection => {
          const user = connection.users.filter(
            user => !user._id.equals(_id)
          )[0] as unknown as UserType;

          return {
            connectionId: connection._id,
            fName: user.fName,
            lName: user.lName,
            imageURL: user.imageURL,
            _id: user._id,
            email: user.email,
          };
        });

        return res.json(friends);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
