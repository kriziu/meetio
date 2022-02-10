import { FC, useContext } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';

import { Header4, Header5 } from 'common/components/Headers';
import { AvatarSmall } from 'common/components/Avatars';
import { UserContainer } from '../styles/SearchUser.elements';
import { animateListItem } from 'common/animations/list.animations';
import { Flex } from 'common/components/Flex';

interface Props {
  user: FetchedUserType;
}

const SearchUser: FC<Props> = ({ user }) => {
  const { friends, followers, mineFollowers } = useContext(storeContext);

  const isFriend = friends.find(friend => friend._id === user._id);
  const isFollower = followers.find(friend => friend._id === user._id);
  const following = mineFollowers.find(friend => friend._id === user._id);

  const string: string[] = [];

  isFriend && string.push('Friend');
  !isFriend && isFollower && string.push('Following');
  following && string.push('Follows you');

  return (
    <motion.li variants={animateListItem}>
      <Link href={`/profile/${user._id}`} passHref>
        <UserContainer as="a">
          <AvatarSmall imageURL={user.imageURL} />
          <Flex className="info">
            <Header4>
              {user.fName} {user.lName}
            </Header4>
            <Header5>{string.join(' | ')}</Header5>
          </Flex>
        </UserContainer>
      </Link>
    </motion.li>
  );
};

export default SearchUser;
