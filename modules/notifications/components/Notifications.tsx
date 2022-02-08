import { FC, useContext } from 'react';

import { userContext } from 'common/context/userContext';

import { Header1 } from 'common/components/Headers';
import Notification from './Notification';

const Notifications: FC = () => {
  const { user } = useContext(userContext);

  return (
    <div>
      <Header1>Notifications</Header1>
      <Notification
        who={user}
        to={user}
        date={new Date()}
        type="like"
        _id="1"
      />
    </div>
  );
};

export default Notifications;
