import { FC } from 'react';

import Link from 'next/link';

import { AvatarSmall } from 'common/components/Avatars';
import { Header3 } from 'common/components/Headers';
import { Buttons, FriendInfo, StyledCard } from '../styles/Friend.elements';
import { Button } from 'common/components/Button';
import { animateListItem } from 'common/animations/list.animations';

const Friend: FC<FriendType> = ({
  imageURL,
  fName,
  lName,
  connectionId,
  _id,
}) => {
  return (
    <StyledCard as="li" variants={animateListItem}>
      <Link href={`/profile/${_id}`} passHref>
        <FriendInfo as="a">
          <AvatarSmall imageURL={imageURL} />
          <Header3>{fName + ' ' + lName}</Header3>
        </FriendInfo>
      </Link>

      <Buttons>
        <Link
          href={`https://chatio-eta.vercel.app/chat/${connectionId}`}
          passHref
        >
          <Button as="a">Chatio</Button>
        </Link>

        <Link passHref href={`/profile/${_id}`}>
          <Button secondary as="a">
            Profile
          </Button>
        </Link>
      </Buttons>
    </StyledCard>
  );
};

export default Friend;
