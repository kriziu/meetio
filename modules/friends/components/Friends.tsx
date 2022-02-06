import { Header2 } from 'common/components/Headers';
import { FC } from 'react';
import Friend from './Friend';

const Friends: FC = () => {
  return (
    <div>
      <Header2>Friends</Header2>
      <Friend />
    </div>
  );
};

export default Friends;
