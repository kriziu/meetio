import { Dispatch, FC, SetStateAction, useContext } from 'react';

import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

import { userContext } from 'common/context/userContext';

import { Avatar } from 'common/components/Avatars';
import { Center } from '../styles/ProfileTop.elements';
import { Header1, Header5 } from 'common/components/Headers';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import useWindowSize from 'common/hooks/useWindowSize';
import { animateProfileTop } from '../animations/ProfileTop.animations';
import Link from 'next/link';

const MotionCenter = motion(Center);

interface Props {
  user: UserType;
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
}

const ProfileTop: FC<Props> = ({ user, topVisible, setTopVisible }) => {
  const {
    user: { _id },
  } = useContext(userContext);

  const me = user._id === _id;

  const [, height] = useWindowSize();

  const handlers = useSwipeable({
    onSwipedUp: e => {
      if (e.absY > 50) setTopVisible(false);
    },
  });

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
      <Header5>Followed by 0 people</Header5>
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
            <Button>Add friend</Button>
            <Button secondary>Follow</Button>
          </>
        )}
      </Flex>
    </MotionCenter>
  );
};

export default ProfileTop;
