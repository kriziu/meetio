import { FC } from 'react';

import { Card } from 'common/components/Card';
import { AvatarSmall } from 'common/components/Avatars';
import { Header3 } from 'common/components/Headers';
import { Buttons, FriendInfo } from '../styles/Friend.elements';
import { Button } from 'common/components/Button';

const Friend: FC<UserType> = ({ imageURL, fName, lName }) => {
  return (
    <Card>
      <FriendInfo>
        <AvatarSmall imageURL={imageURL} />
        <Header3>{fName + ' ' + lName}</Header3>
      </FriendInfo>
      <Buttons>
        <Button>Chatio</Button>
        <Button secondary>Remove</Button>
      </Buttons>
    </Card>
  );
};

export default Friend;
