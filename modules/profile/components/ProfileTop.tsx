import { Dispatch, FC, SetStateAction, useContext } from 'react';

import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

import { userContext } from 'common/context/userContext';
import { storeContext } from 'common/context/storeContext';
import { loaderContext } from 'common/context/loaderContext';

import { Avatar } from 'common/components/Avatars';
import { Center } from '../styles/ProfileTop.elements';
import { Header1, Header5 } from 'common/components/Headers';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import useWindowSize from 'common/hooks/useWindowSize';
import { animateProfileTop } from '../animations/ProfileTop.animations';
import { promiseToast } from 'common/lib/toasts';

const MotionCenter = motion(Center);

interface Props {
  user: UserType;
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserType>>;
}

const ProfileTop: FC<Props> = ({
  user,
  setUser,
  topVisible,
  setTopVisible,
}) => {
  const {
    user: { _id },
  } = useContext(userContext);
  const me = user._id === _id;

  const { friends, followers, mineFollowers, refetchAll } =
    useContext(storeContext);
  const { setLoading } = useContext(loaderContext);

  const [, height] = useWindowSize();

  const handlers = useSwipeable({
    onSwipedUp: e => {
      if (e.absY > 50) setTopVisible(false);
    },
  });

  const handleAddFriend = () => {
    promiseToast(
      axios.post('/api/invite', { to: user._id }).then(refetchAll),
      'Sending invite...',
      'Invite sent!'
    );
  };

  const handleDeleteFriend = () => {
    promiseToast(
      axios
        .delete('/api/profile/friends', { data: { friendId: user._id } })
        .then(refetchAll),
      'Removing from friends...',
      'Removed!'
    );
  };

  const handleFollow = () => {
    setLoading(true);
    axios.post<UserType>('/api/follow', { who: user._id }).then(res => {
      setUser(res.data);
      refetchAll().then(() => setLoading(false));
    });
  };

  const isFriend = friends.map(friend => friend._id).includes(user._id);
  const isFollowed = followers.map(follower => follower._id).includes(user._id);

  return (
    <MotionCenter
      height={height}
      variants={animateProfileTop}
      animate={topVisible ? 'visible' : 'hidden'}
      visible={topVisible}
      {...handlers}
      onWheel={e => {
        if (e.deltaY > 0) setTopVisible(false);
      }}
    >
      <Avatar imageURL={user.imageURL} />
      <Header1>
        {user.fName} {user.lName}
      </Header1>
      <Link href={`/profile/followers/${user._id}`} passHref>
        <Header5 as="a">
          Followed by {me ? mineFollowers.length : user.followed} people
        </Header5>
      </Link>

      <Flex className="buttons">
        {me && (
          <>
            <Link href="/friends" passHref>
              <Button as="a">Friends</Button>
            </Link>

            <Link href="/invites" passHref>
              <Button as="a" secondary>
                Invites
              </Button>
            </Link>
          </>
        )}

        {!me && (
          <>
            {isFriend && <Button onClick={handleDeleteFriend}>Remove</Button>}
            {!isFriend && <Button onClick={handleAddFriend}>Add friend</Button>}

            {isFollowed && (
              <Button secondary onClick={handleFollow}>
                Unfollow
              </Button>
            )}
            {!isFollowed && (
              <Button secondary onClick={handleFollow}>
                Follow
              </Button>
            )}
          </>
        )}
      </Flex>
    </MotionCenter>
  );
};

export default ProfileTop;
