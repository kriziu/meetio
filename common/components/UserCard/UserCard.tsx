import { FC } from 'react';

import Link from 'next/link';

import { animateListItem } from 'common/animations/list.animations';
import { AvatarSmall } from '../Avatars';
import { Header3, Header5 } from '../Headers';
import { StyledCard, Buttons, UserInfo } from './UserCard.elements';

interface Props extends UserType {
  smallText?: string;
  notify?: boolean;
}

const UserCard: FC<Props> = ({
  _id,
  imageURL,
  fName,
  lName,
  smallText,
  notify,
  children,
}) => {
  return (
    <StyledCard as="li" variants={animateListItem} notify={notify}>
      <Link href={`/profile/${_id}`} passHref>
        <UserInfo as="a">
          <AvatarSmall imageURL={imageURL} />
          <div className="info">
            <Header3>{fName + ' ' + lName}</Header3>
            {smallText && <Header5>{smallText}</Header5>}
          </div>
        </UserInfo>
      </Link>

      <Buttons>{children}</Buttons>
    </StyledCard>
  );
};

export default UserCard;
