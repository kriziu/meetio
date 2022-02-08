import { FC } from 'react';

import { motion } from 'framer-motion';

import SearchUser from './SearchUser';
import { animateList } from 'common/animations/list.animations';

interface Props {
  users: FetchedUserType[];
}

const SearchList: FC<Props> = ({ users }) => {
  return (
    <motion.ul variants={animateList} initial="hidden" animate="show">
      {users.map(user => {
        return <SearchUser user={user} key={user._id} />;
      })}
    </motion.ul>
  );
};

export default SearchList;
