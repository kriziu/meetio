import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';

import useWindowSize from 'common/hooks/useWindowSize';

import { Header1 } from 'common/components/Headers';
import Friend from './Friend';
import { SearchFriend, StyledUl } from '../styles/Friends.elements';
import { Input } from 'common/components/Input';
import { Button } from 'common/components/Button';
import { animateList } from 'common/animations/list.animations';

const Friends: FC = () => {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<FriendType[]>();

  const [, height] = useWindowSize();

  useEffect(() => {
    axios
      .get<FriendType[]>('/api/profile/friends')
      .then(res => setFriends(res.data));
  }, []);

  return (
    <div>
      <Header1>Friends</Header1>
      <SearchFriend>
        <Input value={search} onChange={e => setSearch(e.target.value)} />
        <AiOutlineSearch />
        <Button>Sort</Button>
      </SearchFriend>
      {friends && (
        <StyledUl
          height={height}
          variants={animateList}
          initial="hidden"
          animate="show"
        >
          {friends
            ?.filter(friend => {
              const term = search.toLowerCase();

              return (
                friend.fName.toLowerCase() +
                ' ' +
                friend.lName.toLowerCase() +
                ' ' +
                friend.email.toLowerCase()
              ).includes(term);
            })
            .map(args => {
              return <Friend {...args} key={args._id} />;
            })}
        </StyledUl>
      )}
    </div>
  );
};

export default Friends;
