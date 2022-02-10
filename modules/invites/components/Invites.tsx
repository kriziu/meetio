import { FC, useContext, useState } from 'react';

import { motion } from 'framer-motion';

import { storeContext } from 'common/context/storeContext';
import useWindowSize from 'common/hooks/useWindowSize';

import Invite from './Invite';
import { animateList } from 'common/animations/list.animations';
import { Header1, Header2 } from 'common/components/Headers';
import { InvitesContainer } from '../styles/Invites.elements';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';

const searchInvite = (invite: InviteType, search: string, mine = false) => {
  if (mine) {
    const { to } = invite;

    return filterUser(to, search);
  }

  const { from } = invite;

  return filterUser(from, search);
};

const Invites: FC = () => {
  const { invites, mineInvites } = useContext(storeContext);

  const [, height] = useWindowSize();

  const [search, setSearch] = useState('');

  return (
    <InvitesContainer height={height}>
      <SearchList
        input={search}
        handleInputChange={e => setSearch(e.target.value)}
        sort="A"
        handleSortChange={() => {}}
      />
      <Header1>Invites</Header1>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {invites
          .filter(invite => searchInvite(invite, search))
          .map(invite => (
            <Invite {...invite} key={invite._id} />
          ))}
      </motion.ul>
      <Header2>Your invites</Header2>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {mineInvites
          .filter(invite => searchInvite(invite, search, true))
          .map(invite => (
            <Invite {...invite} key={invite._id} />
          ))}
      </motion.ul>
    </InvitesContainer>
  );
};

export default Invites;
