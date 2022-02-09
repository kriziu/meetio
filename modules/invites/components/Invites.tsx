import { FC, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import axios from 'axios';
import useSWR from 'swr';

import useWindowSize from 'common/hooks/useWindowSize';

import Invite from './Invite';
import { animateList } from 'common/animations/list.animations';
import { Header2 } from 'common/components/Headers';
import { InvitesContainer } from '../styles/Invites.elements';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const searchInvite = (invite: InviteType, search: string, mine = false) => {
  if (mine) {
    const { to } = invite;

    return filterUser(to, search);
  }

  const { from } = invite;

  return filterUser(from, search);
};

const Invites: FC = () => {
  const [, height] = useWindowSize();

  const [search, setSearch] = useState('');
  const [invites, setInvites] = useState<InviteType[]>([]);
  const [mineInvites, setMineInvites] = useState<InviteType[]>([]);

  const { data } = useSWR<{ mine: InviteType[]; notMine: InviteType[] }>(
    '/api/invite',
    fetcher
  );

  useEffect(() => {
    if (!data) return;

    setInvites(data.notMine);
    setMineInvites(data.mine);
  }, [data]);

  const deleteInvite = (inviteId: string) => {
    setInvites(prev => prev.filter(invite => invite._id !== inviteId));
    setMineInvites(prev => prev.filter(invite => invite._id !== inviteId));
  };

  return (
    <InvitesContainer height={height}>
      <SearchList
        input={search}
        handleInputChange={e => setSearch(e.target.value)}
        sort="A"
        handleSortChange={() => {}}
      />
      <Header2>Invites</Header2>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {invites
          .filter(invite => searchInvite(invite, search))
          .map(invite => (
            <Invite {...invite} key={invite._id} deleteInvite={deleteInvite} />
          ))}
      </motion.ul>
      <Header2>Your invites</Header2>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {mineInvites
          .filter(invite => searchInvite(invite, search, true))
          .map(invite => (
            <Invite {...invite} key={invite._id} deleteInvite={deleteInvite} />
          ))}
      </motion.ul>
    </InvitesContainer>
  );
};

export default Invites;
