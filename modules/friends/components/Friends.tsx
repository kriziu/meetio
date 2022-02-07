import { FC, useContext } from 'react';

import { userContext } from 'common/context/userContext';

import { Header2 } from 'common/components/Headers';
import Friend from './Friend';

const Friends: FC = () => {
  const { user } = useContext(userContext);

  return (
    <div>
      <Header2>Friends</Header2>
      <Friend {...user} />
    </div>
  );
};

export default Friends;
