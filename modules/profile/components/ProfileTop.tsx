import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

import { defaultUser, userContext } from 'common/context/userContext';
import { storeContext } from 'common/context/storeContext';
import { loaderContext } from 'common/context/loaderContext';
import useWindowSize from 'common/hooks/useWindowSize';

import { Avatar } from 'common/components/Avatars';
import { Center } from '../styles/ProfileTop.elements';
import { Header1, Header5 } from 'common/components/Headers';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import { animateProfileTop } from '../animations/ProfileTop.animations';
import { promiseToast } from 'common/lib/toasts';
import { checkIfNotRead } from 'common/lib/checkIfNotRead';
import AvatarPicker from 'common/components/AvatarPicker/AvatarPicker';

const MotionCenter = motion(Center);

interface Props {
  user: UserType;
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
  setUserProfile: Dispatch<SetStateAction<UserType>>;
}

const ProfileTop: FC<Props> = ({
  user,
  setUserProfile,
  topVisible,
  setTopVisible,
}) => {
  const {
    user: { _id },
    setUser,
  } = useContext(userContext);
  const me = user._id === _id;

  const { friends, followers, mineFollowers, refetchAll, invites } =
    useContext(storeContext);
  const { setLoading } = useContext(loaderContext);

  const router = useRouter();
  const { cache } = useSWRConfig();

  const [, height] = useWindowSize();

  const [changeAvatar, setChangeAvatar] = useState(false);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    setNotify(checkIfNotRead(invites));
  }, [invites]);

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
      setUserProfile(res.data);
      refetchAll().then(() => setLoading(false));
    });
  };

  const handleAcceptInvite = () => {
    setLoading(true);
    axios
      .patch('/api/invite', {
        inviteId: invites.find(invite => invite.from._id === user._id)?._id,
      })
      .then(() => {
        refetchAll().then(() => setLoading(false));
        setLoading(false);
      });
  };

  const handleLogout = () => {
    axios.post('/api/auth/logout').then(res => {
      setUser(defaultUser);
      (cache as any).delete();
      router.push('/login');
    });
  };

  const isInviter = invites.map(invite => invite.from._id).includes(user._id);
  const isFriend = friends.map(friend => friend._id).includes(user._id);
  const isFollowed = followers.map(follower => follower._id).includes(user._id);

  return (
    <>
      {changeAvatar && <AvatarPicker onPost={() => setChangeAvatar(false)} />}
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
        {me && (
          <Header5 onClick={() => setChangeAvatar(true)} className="avatar">
            Change photo
          </Header5>
        )}
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
                <Button as="a" secondary className={notify ? 'invites' : ''}>
                  Invites
                </Button>
              </Link>
            </>
          )}

          {!me && (
            <>
              {isFriend && <Button onClick={handleDeleteFriend}>Remove</Button>}
              {!isFriend && isInviter && (
                <Button onClick={handleAcceptInvite}>Accept</Button>
              )}
              {!isFriend && !isInviter && (
                <Button onClick={handleAddFriend}>Add friend</Button>
              )}

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
        {me && (
          <Button className="logout" onClick={handleLogout} secondary>
            logout
          </Button>
        )}
      </MotionCenter>
    </>
  );
};

export default ProfileTop;
