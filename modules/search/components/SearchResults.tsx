import { FC, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import axios from 'axios';

import { useSpinner } from 'common/hooks/useSpinner';

import { ResultsContainer } from '../styles/SearchResults.elements';
import { Header2 } from 'common/components/Headers';
import { animateContainer } from '../animations/SearchResults.animations';
import SearchList from './SearchList';

const MotionContainer = motion(ResultsContainer);

let timeout: NodeJS.Timeout;

interface Props {
  search: string;
}

const SearchResults: FC<Props> = ({ search }) => {
  const [results, setResults] = useState<FetchedUserType[]>([]);

  const [Spinner, setLoading, loading] = useSpinner();

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
    <MotionContainer
      initial={false}
      animate={search ? 'open' : 'closed'}
      variants={animateContainer}
    >
      <Header2>Search results</Header2>
      <Spinner />
      {!loading && <SearchList users={results} />}
    </MotionContainer>
  );
};

export default SearchResults;
