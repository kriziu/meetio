import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search: FC = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (router.pathname === '/login' || router.pathname === '/register')
      setShow(false);
    else setShow(true);

    const reset = () => setSearch('');
    router.events.on('routeChangeStart', reset);

    return () => {
      router.events.off('routeChangeStart', reset);
    };
  }, [router]);

  if (!show) return null;

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <SearchResults search={search} />
    </>
  );
};

export default Search;
