import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search: FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const reset = () => setSearch('');
    router.events.on('routeChangeStart', reset);

    return () => {
      router.events.off('routeChangeStart', reset);
    };
  }, [router]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <SearchResults search={search} />
    </>
  );
};

export default Search;
