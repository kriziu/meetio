import { focusClick } from 'common/lib/utility';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button } from '../Button';
import { Input } from '../Input';
import Portal from '../Portal';
import { DropDown, SearchContainer } from './SearchList.elements';

interface Props {
  input: string;
  sort: 'A' | 'Z';
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: Dispatch<SetStateAction<'A' | 'Z'>>;
}

const SearchList: FC<Props> = ({
  input,
  sort,
  handleInputChange,
  handleSortChange,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  const position = btnRef.current?.getBoundingClientRect();

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => opened && setOpened(false);

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [opened]);

  return (
    <>
      <Portal>
        {position && opened && (
          <DropDown
            x={position.x}
            y={position.y + position.height}
            ref={dropdownRef}
          >
            <div
              className={sort === 'A' ? 'active' : ''}
              onClick={() => handleSortChange('A')}
              tabIndex={0}
              onKeyDown={e => focusClick(e, () => handleSortChange('A'))}
            >
              A...Z
            </div>
            <div
              className={sort === 'Z' ? 'active' : ''}
              onClick={() => handleSortChange('Z')}
              tabIndex={0}
              onKeyDown={e => focusClick(e, () => handleSortChange('Z'))}
            >
              Z...A
            </div>
          </DropDown>
        )}
      </Portal>
      <SearchContainer>
        <Input value={input} onChange={handleInputChange} />
        <AiOutlineSearch />
        <Button ref={btnRef} onClick={() => setOpened(e => !e)}>
          Sort
        </Button>
      </SearchContainer>
    </>
  );
};

export default SearchList;
