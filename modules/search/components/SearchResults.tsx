import { FC, useEffect, useState } from 'react';

import axios from 'axios';

import { useSpinner } from 'common/hooks/useSpinner';

import { ResultsContainer } from '../styles/SearchResults.elements';
import { Header2 } from 'common/components/Headers';
import { animateContainer } from '../animations/SearchResults.animations';
import SearchList from './SearchList';
import useWindowSize from 'common/hooks/useWindowSize';

let timeout: NodeJS.Timeout;

interface Props {
  search: string;
}

const SearchResults: FC<Props> = ({ search }) => {
  const [results, setResults] = useState<FetchedUserType[]>([]);

  const [Spinner, setLoading, loading] = useSpinner();
  const [, height] = useWindowSize();

  useEffect(() => {
    setResults([]);
    if (search.length < 3) return;

    setLoading(true);
    clearTimeout(timeout);

    timeout = setTimeout(
      () =>
        axios.get(`/api/user/search?term=${search}`).then(res => {
          setResults(res.data);
          setLoading(false);
        }),
      500
    );
  }, [search, setLoading]);

  return (
    <ResultsContainer
      initial={false}
      animate={search ? 'open' : 'closed'}
      variants={animateContainer}
      shown={!!search}
      custom={height - 200}
    >
      <Header2>Search results</Header2>
      <Spinner />
      {!loading && <SearchList users={results} />}
    </ResultsContainer>
  );
};

export default SearchResults;
