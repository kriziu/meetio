import { createContext, FC, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import useSWR, { useSWRConfig } from 'swr';

export const storeContext = createContext<{
  mineFollowers: UserType[];
  followers: UserType[];
  friends: FriendType[];
  mineInvites: InviteType[];
  invites: InviteType[];
  likedPosts: PostType[];
  refetchAll: () => Promise<unknown>;
}>({
  mineFollowers: [],
  followers: [],
  friends: [],
  mineInvites: [],
  invites: [],
  likedPosts: [],
  refetchAll: () => new Promise(resolve => resolve('resolve')),
});

const StoreProvider: FC = ({ children }) => {
  const access = Cookies.get('ACCESS');

  const { mutate } = useSWRConfig();

  const [mineFollowers, setMineFollowers] = useState<UserType[]>([]);
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [mineInvites, setMineInvites] = useState<InviteType[]>([]);
  const [invites, setInvites] = useState<InviteType[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostType[]>([]);

  const followersData = useSWR<{ mine: UserType[]; notMine: UserType[] }>(
    access && '/api/follow'
  );

  const friendsData = useSWR<FriendType[]>(access && '/api/profile/friends');

  const invitesData = useSWR<{ mine: InviteType[]; notMine: InviteType[] }>(
    access && '/api/invite'
  );

  const likedData = useSWR<PostType[]>(access && '/api/post/like');

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

  useEffect(() => {
    const { data } = likedData;
    if (data) {
      setLikedPosts(data);
    }
  }, [likedData]);

  const refetchAll = () => {
    const promise = new Promise(resolve => {
      let made = 0;

      const helper = () => {
        made++;
        if (made === 4) resolve('refetched');
      };

      mutate('/api/follow').then(helper);
      mutate('/api/profile/friends').then(helper);
      mutate('/api/invite').then(helper);
      mutate('/api/post/like').then(helper);
    });

    return promise;
  };

  console.log(likedPosts);

  return (
    <storeContext.Provider
      value={{
        mineFollowers,
        followers,
        friends,
        invites,
        mineInvites,
        likedPosts,
        refetchAll,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
