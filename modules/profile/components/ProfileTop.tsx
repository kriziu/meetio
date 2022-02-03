import { Dispatch, FC, SetStateAction } from 'react';

import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

import { Avatar } from 'common/components/Avatars';
import { Center } from '../styles/ProfileTop.elements';
import { Header1, Header5 } from 'common/components/Headers';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import useWindowSize from 'common/hooks/useWindowSize';
import { animateProfileTop } from '../animations/ProfileTop.animations';

const MotionCenter = motion(Center);

interface Props {
  user: UserType;
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
}

const ProfileTop: FC<Props> = ({ user, topVisible, setTopVisible }) => {
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
    >
      <Avatar imageURL={user.imageURL} />
      <Header1>
        {user.fName} {user.lName}
      </Header1>
      <Header5>Followed by 0 people</Header5>
      <Flex className="buttons">
        <Button>Add friend</Button>
        <Button>Follow</Button>
      </Flex>
    </MotionCenter>
  );
};

export default ProfileTop;
