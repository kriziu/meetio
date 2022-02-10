import { FC, useContext, useState } from 'react';

import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';
import useWindowSize from 'common/hooks/useWindowSize';

import { Header1, Header4 } from 'common/components/Headers';
import Friend from './Friend';
import { StyledUl } from '../styles/Friends.elements';
import { animateList } from 'common/animations/list.animations';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';
import { sortAlph } from 'common/lib/sort';

const Friends: FC = () => {
  const { friends } = useContext(storeContext);

  const [, height] = useWindowSize();

  const [search, setSearch] = useState('');

  return (
    <div>
      <Header1>Friends</Header1>
      <div style={{ textAlign: 'center' }}>
        <Link href="/invites" passHref>
          <Header4 as="a">(See invites)</Header4>
        </Link>
      </div>

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
            .sort((a, b) => sortAlph(a, b))
            .map(args => {
              return <Friend {...args} key={args._id} />;
            })}
        </StyledUl>
      )}
    </div>
  );
};

export default Friends;
