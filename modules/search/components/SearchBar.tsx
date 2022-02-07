import { Dispatch, FC, SetStateAction } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import { Input } from 'common/components/Input';
import { TopContainer } from '../styles/SearchBar.elements';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<Props> = ({ search, setSearch }) => {
  return (
    <TopContainer>
      <Input full value={search} onChange={e => setSearch(e.target.value)} />
      <AiOutlineSearch />
    </TopContainer>
  );
};

export default SearchBar;
