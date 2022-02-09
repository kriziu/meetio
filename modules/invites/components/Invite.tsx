import { FC, useContext } from 'react';

import axios from 'axios';

import { storeContext } from 'common/context/storeContext';
import { userContext } from 'common/context/userContext';

import { AvatarSmall } from 'common/components/Avatars';
import { Header3, Header5 } from 'common/components/Headers';
import { Buttons, StyledCard, UserInfo } from '../styles/Invite.elements';
import { Button } from 'common/components/Button';
import { getDate } from 'common/lib/date';
import { animateListItem } from 'common/animations/list.animations';

const Invite: FC<InviteType> = ({ _id, from, to, date }) => {
  const { user } = useContext(userContext);
  const { refetchAll } = useContext(storeContext);

  const mine = user._id === to._id;

  const { imageURL, fName, lName } = mine ? from : to;

  const handleAccept = () => {
    axios.patch('/api/invite', { inviteId: _id }).then(() => refetchAll());
  };

  const handleRemove = () => {
    axios
      .delete('/api/invite', { data: { inviteId: _id } })
      .then(() => refetchAll());
  };

  return (
    <StyledCard as="li" variants={animateListItem}>
      <UserInfo>
        <AvatarSmall imageURL={imageURL} />
        <div className="info">
          <Header3>{fName + ' ' + lName}</Header3>
          <Header5>{getDate(new Date(date))}</Header5>
        </div>
      </UserInfo>
      <Buttons>
        {mine && <Button onClick={handleAccept}>Accept</Button>}
        <Button onClick={handleRemove} secondary>
          Remove
        </Button>
      </Buttons>
    </StyledCard>
  );
};

export default Invite;
