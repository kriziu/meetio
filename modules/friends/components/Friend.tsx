import { FC } from 'react';

import Link from 'next/link';

import { Button } from 'common/components/Button';
import UserCard from 'common/components/UserCard/UserCard';

const Friend: FC<FriendType> = props => {
  return (
    <UserCard {...props}>
      <Link
        href={`https://chatio-eta.vercel.app/chat/${props.connectionId}`}
        passHref
      >
        <Button as="a">Chatio</Button>
      </Link>

      <Link passHref href={`/profile/${props._id}`}>
        <Button secondary as="a">
          Profile
        </Button>
      </Link>
    </UserCard>
  );
};

export default Friend;
