import { FC, useContext } from 'react';

import axios from 'axios';
import { KeyedMutator } from 'swr';
import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';
import { loaderContext } from 'common/context/loaderContext';

import { Button } from 'common/components/Button';
import UserCard from 'common/components/UserCard/UserCard';

interface Props extends UserType {
  mutate: KeyedMutator<UserType[]>;
  me?: boolean;
  mine?: boolean;
  followedByMe?: boolean;
}

const Follower: FC<Props> = props => {
  const { _id, fName, imageURL, lName, me, mine, mutate, followedByMe } = props;

  const { refetchAll } = useContext(storeContext);
  const { setLoading } = useContext(loaderContext);

  const handleRemove = () => {
    setLoading(true);

    if (followedByMe) {
      axios.post<UserType>('/api/follow', { who: _id }).then(() => {
        refetchAll().then(() => setLoading(false));
        setLoading(false);
      });

      return;
    }

    axios.delete('/api/follow', { data: { followerId: _id } }).then(() => {
      new Promise(resolve => {
        let made = 0;

        const helper = () => {
          made++;
          if (made === 2) resolve('success');
        };
        mutate().then(helper);
        refetchAll().then(helper);
      }).then(() => setLoading(false));

      setLoading(false);
    });
  };

  return (
    <UserCard {...props}>
      <Link href={`/profile/${_id}`} passHref>
        <Button as="a">Profile</Button>
      </Link>

      {mine && me && (
        <Button onClick={handleRemove} secondary>
          {followedByMe ? 'Unfollow' : 'Remove'}
        </Button>
      )}
    </UserCard>
  );
};

export default Follower;
