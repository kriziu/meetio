import { FC } from 'react';

import { Button } from 'common/components/Button';
import UserCard from 'common/components/UserCard/UserCard';

const messages = {
  like: 'Liked you post.',
  mention: 'Mentioned you.',
  reply: 'Replied.',
  comment: 'Commented.',
};

const Notification: FC<NotificationType> = ({ type, date, to, who }) => {
  return (
    <UserCard {...who} smallText={messages.like}>
      <Button>Check</Button>
    </UserCard>
  );
};

export default Notification;
