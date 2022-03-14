import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'backend/utils/connectDB';
import inviteModel from 'backend/models/invite.model';
import connectionModel from 'backend/models/connection.model';
import getUserId from 'backend/utils/getUserId';
import userModel from 'backend/models/user.model';
import messageModel from 'backend/models/message.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _id = getUserId(req);

  try {
    const { inviteId } = req.body;
    const inviteFound = await inviteModel.findById(inviteId);

    switch (req.method) {
      case 'GET':
        const invites = await inviteModel
          .find({ $or: [{ from: _id }, { to: _id }] })
          .populate({ path: 'to from', model: userModel });

        const mine = invites.filter(invite => invite.from._id.equals(_id));
        const notMine = invites.filter(invite => invite.to._id.equals(_id));

        return res.json({ mine, notMine });

      case 'POST':
        const { to } = req.body;

        const found = await inviteModel.findOne({ from: _id, to });
        const foundConnection = await connectionModel.findOne({
          users: { $all: [_id, to] },
          group: false,
        });

        if (found || foundConnection) return res.status(200).end();

        const invite = new inviteModel({ from: _id, to });
        await invite.save();

        return res.status(201).json(invite);

      case 'PATCH':
        if (inviteFound?.to.equals(_id)) {
          await (
            await inviteFound.populate({ path: 'to', model: userModel })
          ).populate({ path: 'from', model: userModel });

          const fromUser = inviteFound.from;
          const toUser = inviteFound.to;

          const newConnection = new connectionModel({
            users: [fromUser?._id, toUser?._id],
            group: false,
            blocked: {
              yes: false,
              by: null,
            },
          });

          const newMessage = new messageModel({
            administrate: true,
            connectionId: newConnection._id,
            sender: _id,
            message: 'created conversation',
            date: new Date(),
            read: [_id],
          });

          await newConnection.save();
          await newMessage.save();
          await inviteFound.delete();

          return res.status(201).json(newConnection);
        }

        return res.status(400).end();

      case 'DELETE':
        if (inviteFound?.to.equals(_id) || inviteFound?.from.equals(_id)) {
          await inviteFound.delete();

          return res.end();
        }
      default:
        return res.status(400).end();
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.log(msg);
    if (msg) return res.status(500).send({ error: msg });
    res.status(500).end();
  }
};

export default connectDB(handler);
