import { FC, useContext } from 'react';

import axios from 'axios';
import { KeyedMutator } from 'swr';
import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';
import { useBigSpinner } from 'common/hooks/useSpinner';

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

  const [BigSpinner, setLoading] = useBigSpinner();

  const handleRemove = () => {
    setLoading(true);

    if (followedByMe) {
      axios.post<UserType>('/api/follow', { who: _id }).then(() => {
        refetchAll();
        setLoading(false);
      });

      return;
    }

    axios.delete('/api/follow', { data: { followerId: _id } }).then(() => {
      mutate();
      refetchAll();
      setLoading(false);
    });
  };

  return (
    <>
      <BigSpinner />
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
    </>
  );
};

export default Follower;
