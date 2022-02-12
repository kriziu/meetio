import { FC } from 'react';

import { Button } from 'common/components/Button';
import UserCard from 'common/components/UserCard/UserCard';

const messages = {
  like: 'Liked you post.',
  mention: 'Mentioned you.',
  reply: 'Replied.',
  comment: 'Commented.',
};

const Notification: FC<NotificationType> = ({ type, date, who, read }) => {
  return (
    <UserCard {...who} smallText={messages[type]} notify={!read}>
      <Button>Check</Button>
    </UserCard>
  );
};

export default Notification;
