import { FC, useContext, useEffect, useState } from 'react';

import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';
import useWindowSize from 'common/hooks/useWindowSize';

import { Header1, Header4 } from 'common/components/Headers';
import Friend from './Friend';
import { InvitesContainer, StyledUl } from '../styles/Friends.elements';
import { animateList } from 'common/animations/list.animations';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';
import { sortAlph } from 'common/lib/sort';
import { checkIfNotRead } from 'common/lib/checkIfNotRead';

const Friends: FC = () => {
  const { friends, invites } = useContext(storeContext);

  const [, height] = useWindowSize();

  const [notify, setNotify] = useState(false);
  const [sort, setSort] = useState<'A' | 'Z'>('A');

  useEffect(() => {
    setNotify(checkIfNotRead(invites));
  }, [invites]);

  const [search, setSearch] = useState('');

  return (
    <div>
      <Header1>Friends</Header1>
      <InvitesContainer notify={notify}>
        <Link href="/invites" passHref>
          <Header4 as="a">(See invites)</Header4>
        </Link>
      </InvitesContainer>

      <SearchList
        input={search}
        handleInputChange={e => setSearch(e.target.value)}
        sort={sort}
        handleSortChange={setSort}
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
            .sort((a, b) => sortAlph(a, b, sort))
            .map(args => {
              return <Friend {...args} key={args._id} />;
            })}
        </StyledUl>
      )}
    </div>
  );
};

export default Friends;
