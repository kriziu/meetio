import { createContext, FC, useContext } from 'react';

import Cookies from 'js-cookie';
import useSWR, { useSWRConfig } from 'swr';

import { userContext } from './userContext';

export const storeContext = createContext<{
  mineFollowers: UserType[];
  followers: UserType[];
  friends: FriendType[];
  mineInvites: InviteType[];
  invites: InviteType[];
  likedPosts: PostType[];
  notifications: NotificationType[];
  refetchAll: () => Promise<unknown>;
}>({
  mineFollowers: [],
  followers: [],
  friends: [],
  mineInvites: [],
  invites: [],
  likedPosts: [],
  notifications: [],
  refetchAll: () => new Promise(resolve => resolve('resolve')),
});

const StoreProvider: FC = ({ children }) => {
  const access = Cookies.get('ACCESS');
  const { user } = useContext(userContext);

  const { mutate } = useSWRConfig();

  const followersData = useSWR<{ mine: UserType[]; notMine: UserType[] }>(
    access && '/api/follow'
  );
  const friendsData = useSWR<FriendType[]>(access && '/api/profile/friends');
  const invitesData = useSWR<{ mine: InviteType[]; notMine: InviteType[] }>(
    access && '/api/invite'
  );
  const likedData = useSWR<PostType[]>(access && '/api/post/like');

  const refetchAll = () => {
    const promise = new Promise(resolve => {
      let made = 0;

      const helper = () => {
        made++;
        if (made === 4) resolve('success');
      };

      mutate('/api/follow').then(helper);
      mutate('/api/profile/friends').then(helper);
      mutate('/api/invite').then(helper);
      mutate('/api/post/like').then(helper);
    });

    return promise;
  };

  const notifications: NotificationType[] = [
    {
      _id: '123',
      date: new Date(),
      read: true,
      to: user,
      who: user,
      type: 'like',
    },
    {
      _id: '124',
      date: new Date(),
      read: true,
      to: user,
      who: user,
      type: 'mention',
    },
    {
      _id: '125',
      date: new Date(),
      read: true,
      to: user,
      who: user,
      type: 'reply',
    },
  ];

  return (
    <storeContext.Provider
      value={{
        mineFollowers: followersData.data ? followersData.data.mine : [],
        followers: followersData.data ? followersData.data.notMine : [],
        friends: friendsData.data ? friendsData.data : [],
        invites: invitesData.data ? invitesData.data.notMine : [],
        mineInvites: invitesData.data ? invitesData.data.mine : [],
        likedPosts: likedData.data ? likedData.data : [],
        refetchAll,
        notifications,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
