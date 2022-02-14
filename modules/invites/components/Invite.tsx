import { FC, MutableRefObject, useContext } from 'react';

import axios from 'axios';

import { storeContext } from 'common/context/storeContext';
import { userContext } from 'common/context/userContext';
import { loaderContext } from 'common/context/loaderContext';

import UserCard from 'common/components/UserCard/UserCard';
import { Button } from 'common/components/Button';
import { getDate } from 'common/lib/date';

interface Props extends InviteType {
  childrenRefs?: MutableRefObject<HTMLLIElement[]>;
  index?: number;
}

const Invite: FC<Props> = ({
  _id,
  from,
  to,
  date,
  read,
  childrenRefs,
  index,
}) => {
  const { user } = useContext(userContext);
  const { refetchAll } = useContext(storeContext);
  const { setLoading } = useContext(loaderContext);

  const toMe = user._id === to._id;
  const userToPass = toMe ? from : to;

  const handleAccept = () => {
    setLoading(true);
    axios.patch('/api/invite', { inviteId: _id }).then(() => {
      refetchAll().then(() => setLoading(false));
      setLoading(false);
    });
  };

  const handleRemove = () => {
    setLoading(true);
    axios.delete('/api/invite', { data: { inviteId: _id } }).then(() => {
      refetchAll().then(() => setLoading(false));
      setLoading(false);
    });
  };

  return (
    <UserCard
      {...userToPass}
      smallText={getDate(new Date(date))}
      notify={!read && toMe}
      ref={(el: HTMLLIElement) => {
        if (!childrenRefs || index === undefined || !el) return;

        childrenRefs.current[index] = el;
      }}
      htmlId={_id}
    >
      {toMe && <Button onClick={handleAccept}>Accept</Button>}
      <Button onClick={handleRemove} secondary>
        Remove
      </Button>
    </UserCard>
  );
};

export default Invite;
