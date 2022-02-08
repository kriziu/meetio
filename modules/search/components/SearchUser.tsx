import { FC } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Header4 } from 'common/components/Headers';
import { AvatarSmall } from 'common/components/Avatars';
import { UserContainer } from '../styles/SearchUser.elements';
import { animateListItem } from 'common/animations/list.animations';

interface Props {
  user: FetchedUserType;
}

const SearchUser: FC<Props> = ({ user }) => {
  return (
    <motion.li variants={animateListItem}>
      <Link href={`/profile/${user._id}`} passHref>
        <UserContainer as="a">
          <AvatarSmall imageURL={user.imageURL} />
          <Header4>
            {user.fName} {user.lName}
          </Header4>
        </UserContainer>
      </Link>
    </motion.li>
  );
};

export default SearchUser;
