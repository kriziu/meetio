import { createContext, FC, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const storeContext = createContext<{
  mineFollowers: UserType[];
  followers: UserType[];
  friends: FriendType[];
  mineInvites: InviteType[];
  invites: InviteType[];
  refetchAll: () => void;
}>({
  mineFollowers: [],
  followers: [],
  friends: [],
  mineInvites: [],
  invites: [],
  refetchAll: () => {},
});

const StoreProvider: FC = ({ children }) => {
  const access = Cookies.get('ACCESS');

  const { mutate } = useSWRConfig();

  const [mineFollowers, setMineFollowers] = useState<UserType[]>([]);
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [mineInvites, setMineInvites] = useState<InviteType[]>([]);
  const [invites, setInvites] = useState<InviteType[]>([]);

  const followersData = useSWR<{ mine: UserType[]; notMine: UserType[] }>(
    access && '/api/follow',
    fetcher
  );

  const friendsData = useSWR<FriendType[]>(
    access && '/api/profile/friends',
    fetcher
  );

  const invitesData = useSWR<{ mine: InviteType[]; notMine: InviteType[] }>(
    access && '/api/invite',
    fetcher
  );

  useEffect(() => {
    const { data } = followersData;
    if (data) {
      setMineFollowers(data.mine);
      setFollowers(data.notMine);
    }
  }, [followersData]);

  useEffect(() => {
    const { data } = friendsData;
    if (data) {
      setFriends(data);
    }
  }, [friendsData]);

  useEffect(() => {
    const { data } = invitesData;
    if (data) {
      setMineInvites(data.mine);
      setInvites(data.notMine);
    }
  }, [invitesData]);

  const refetchAll = () => {
    mutate('/api/follow');
    mutate('/api/profile/friends');
    mutate('/api/invite');
  };

  return (
    <storeContext.Provider
      value={{
        mineFollowers,
        followers,
        friends,
        invites,
        mineInvites,
        refetchAll,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
