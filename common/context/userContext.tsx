import { createContext, FC, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import axios from 'axios';
import useSWR from 'swr';

export const defaultUser: UserType = {
  fName: '',
  lName: '',
  email: '',
  _id: '',
  imageURL: '',
  followed: 0,
};

export const userContext = createContext<{
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}>({ user: defaultUser, setUser: () => {} });

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserType>(defaultUser);
  const access = Cookies.get('ACCESS');

  const { data } = useSWR<{ url: string }>(access && '/api/profile/image');

  useEffect(() => {
    if (access) {
      const decoded = decode<UserType>(access);

      setUser(decoded);
      return;
    }

    setUser(defaultUser);
  }, [access]);

  useEffect(() => {
    if (access && data) {
      setUser(prev => {
        return { ...prev, imageURL: data.url };
      });
    }
  }, [access, data]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
