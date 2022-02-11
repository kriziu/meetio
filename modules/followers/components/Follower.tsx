import { FC, useContext } from 'react';

import axios from 'axios';
import { KeyedMutator } from 'swr';
import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';
import { loaderContext } from 'common/context/loaderContext';

import { AvatarSmall } from 'common/components/Avatars';
import { Header3 } from 'common/components/Headers';
import { Buttons, StyledCard, UserInfo } from '../styles/Follower.elements';
import { Button } from 'common/components/Button';
import { animateListItem } from 'common/animations/list.animations';

interface Props extends UserType {
  mutate: KeyedMutator<UserType[]>;
  me?: boolean;
  mine?: boolean;
  followedByMe?: boolean;
}

const Follower: FC<Props> = ({
  _id,
  fName,
  imageURL,
  lName,
  me,
  mine,
  mutate,
  followedByMe,
}) => {
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
    <StyledCard as="li" variants={animateListItem}>
      <Link href={`/profile/${_id}`} passHref>
        <UserInfo as="a">
          <AvatarSmall imageURL={imageURL} />
          <div className="info">
            <Header3>{fName + ' ' + lName}</Header3>
          </div>
        </UserInfo>
      </Link>

      <Buttons>
        <Link href={`/profile/${_id}`} passHref>
          <Button as="a">Profile</Button>
        </Link>

        {mine && me && (
          <Button onClick={handleRemove} secondary>
            {followedByMe ? 'Unfollow' : 'Remove'}
          </Button>
        )}
      </Buttons>
    </StyledCard>
  );
};

export default Follower;
