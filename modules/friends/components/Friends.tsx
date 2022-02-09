import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import useSWR from 'swr';

import useWindowSize from 'common/hooks/useWindowSize';

import { Header1 } from 'common/components/Headers';
import Friend from './Friend';
import { StyledUl } from '../styles/Friends.elements';
import { animateList } from 'common/animations/list.animations';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Friends: FC = () => {
  const [, height] = useWindowSize();

  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<FriendType[]>();

  const { data } = useSWR<FriendType[]>('/api/profile/friends', fetcher);

  useEffect(() => {
    if (!data) return;

    setFriends(data);
  }, [data]);

  return (
    <div>
      <Header1>Friends</Header1>
      <SearchList
        input={search}
        handleInputChange={e => setSearch(e.target.value)}
        sort="A"
        handleSortChange={() => {}}
      />
      {friends && (
        <StyledUl
          height={height}
          variants={animateList}
          initial="hidden"
          animate="show"
        >
          {friends
            ?.filter(friend => filterUser(friend, search))
            .map(args => {
              return <Friend {...args} key={args._id} />;
            })}
        </StyledUl>
      )}
    </div>
  );
};

export default Friends;
