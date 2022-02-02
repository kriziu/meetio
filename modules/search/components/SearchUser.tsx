import { FC } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Header4 } from 'common/components/Headers';
import { AvatarSmall } from 'common/components/Avatars';
import { UserContainer } from '../styles/SearchUser.elements';

interface Props {
  user: FetchedUserType;
}

const SearchUser: FC<Props> = ({ user }) => {
  return (
    <motion.li initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Link href="/profile" passHref>
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
