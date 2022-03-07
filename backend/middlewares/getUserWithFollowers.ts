import userModel from 'backend/models/user.model';
import followModel from 'backend/models/follow.model';

const getUserWithFollowers = async (_id: string) => {
  const user = await userModel.findById(_id);

  const userFollowers = await followModel.find({ who: _id }).count();
};

export default getUserWithFollowers;
