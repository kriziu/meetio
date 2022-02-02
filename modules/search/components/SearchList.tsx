import { FC } from 'react';

import { AnimatePresence } from 'framer-motion';
import SearchUser from './SearchUser';

interface Props {
  users: FetchedUserType[];
}

const SearchList: FC<Props> = ({ users }) => {
  return (
    <AnimatePresence>
      <ul>
        {users.map(user => {
          return <SearchUser user={user} key={user._id} />;
        })}
      </ul>
    </AnimatePresence>
  );
};

export default SearchList;
