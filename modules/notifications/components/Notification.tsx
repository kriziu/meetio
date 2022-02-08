import { FC } from 'react';

import { Card } from 'common/components/Card';
import { AvatarSmall } from 'common/components/Avatars';
import { Header3, Header5 } from 'common/components/Headers';
import { Buttons, NotificationInfo } from '../styles/Notification.elements';
import { Button } from 'common/components/Button';

const messages = {
  like: 'Liked you post.',
  mention: 'Mentioned you.',
  reply: 'Replied.',
  comment: 'Commented.',
};

const Notification: FC<NotificationType> = ({ type, date, to, who }) => {
  const { imageURL, fName, lName } = who;

  return (
    <Card>
      <NotificationInfo>
        <AvatarSmall imageURL={imageURL} />
        <div>
          <Header3>{fName + ' ' + lName}</Header3>
          <Header5>{messages[type]}</Header5>
        </div>
      </NotificationInfo>
      <Buttons>
        <Button>Check</Button>
      </Buttons>
    </Card>
  );
};

export default Notification;
