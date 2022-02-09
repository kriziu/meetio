import { ChangeEvent, FC } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button } from '../Button';
import { Input } from '../Input';
import { SearchContainer } from './SearchList.elements';

interface Props {
  input: string;
  sort: 'A' | 'X';
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: () => void;
}

const SearchList: FC<Props> = ({
  input,
  sort,
  handleInputChange,
  handleSortChange,
}) => {
  return (
    <SearchContainer>
      <Input value={input} onChange={handleInputChange} />
      <AiOutlineSearch />
      <Button>Sort</Button>
    </SearchContainer>
  );
};

export default SearchList;
