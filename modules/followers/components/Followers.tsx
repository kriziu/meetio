import { FC, useContext, useState } from 'react';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import axios from 'axios';

import { userContext } from 'common/context/userContext';
import { storeContext } from 'common/context/storeContext';
import useWindowSize from 'common/hooks/useWindowSize';

import Follower from './Follower';
import { animateList } from 'common/animations/list.animations';
import { Header2 } from 'common/components/Headers';
import { FollowersContainer } from '../styles/Followers.elements';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';
import Spinner from 'common/components/Spinner';
import { sortAlph } from 'common/lib/sort';

const Followers: FC = () => {
  const {
    user: { _id },
  } = useContext(userContext);
  const { followers } = useContext(storeContext);

  const [, height] = useWindowSize();

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'A' | 'Z'>('A');

  const router = useRouter();
  const userId = router.query.userId as string;

  const me = userId === _id;

  const { data, mutate } = useSWR<UserType[]>(
    userId && `/api/follow?profile=true&userId=${userId}`,
    url => axios.get(url, { data: { who: userId } }).then(res => res.data)
  );

  return (
    <FollowersContainer height={height} me={me}>
      <SearchList
        input={search}
        handleInputChange={e => setSearch(e.target.value)}
        sort={sort}
        handleSortChange={setSort}
      />
      <Header2>{me ? 'Your followers' : 'Followers'}</Header2>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        <Spinner loading={!data} />

        {data
          ?.filter(follower => filterUser(follower, search))
          .sort((a, b) => sortAlph(a, b, sort))
          .map(follower => (
            <Follower
              {...follower}
              key={follower._id}
              mutate={mutate}
              me={me}
              mine
            />
          ))}
      </motion.ul>

      {me && (
        <>
          <Header2>You follow</Header2>
          <motion.ul variants={animateList} initial="hidden" animate="show">
            {followers
              .filter(follower => filterUser(follower, search))
              .sort((a, b) => sortAlph(a, b, sort))
              .map(follower => (
                <Follower
                  {...follower}
                  key={follower._id}
                  mutate={mutate}
                  mine
                  me
                  followedByMe
                />
              ))}
          </motion.ul>
        </>
      )}
    </FollowersContainer>
  );
};

export default Followers;
