import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';

import axios from 'axios';

import { useBigSpinner } from 'common/hooks/useSpinner';
import { userContext } from 'common/context/userContext';

import { Flex } from 'common/components/Flex';
import { Button } from 'common/components/Button';
import { Header4 } from 'common/components/Headers';
import { AvatarSmall } from 'common/components/Avatars';
import { AvatarContainer, Container, DarkBG } from './AvatarPicker.elements';
import Portal from '../Portal';

interface Props {
  group?: boolean;
  setImageUp?: Dispatch<SetStateAction<File | undefined>>;
  onPost: () => void;
}

const AvatarPicker: FC<Props> = ({ group, setImageUp, onPost }) => {
  const { setUser } = useContext(userContext);

  const [image, setImage] = useState<File>();

  const [RenderSpinner, setLoading] = useBigSpinner();

  return (
    <Portal>
      <RenderSpinner />
      <DarkBG onClick={onPost}>
        <Container onClick={e => e.stopPropagation()}>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!image || group) return;

              const body = new FormData();
              body.append('image', image);
              setLoading(true);

              axios
                .post<{ url: string }>('/api/profile/image', body)
                .then(res => {
                  setUser(prev => {
                    return { ...prev, imageURL: res.data.url };
                  });
                  setLoading(false);
                  onPost();
                });
            }}
          >
            <Flex>
              <label htmlFor="file1">
                <Header4 tabIndex={0}>Click to select image</Header4>
              </label>
              <input
                id="file1"
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={e => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    setImageUp && setImageUp(e.target.files[0]);
                  }
                }}
                style={{ display: 'none' }}
              />
            </Flex>
            {image && (
              <AvatarContainer>
                <AvatarSmall imageURL={URL.createObjectURL(image)} />
                {!group && (
                  <Button type="submit" inputSize>
                    Upload
                  </Button>
                )}
              </AvatarContainer>
            )}
          </form>
        </Container>
      </DarkBG>
    </Portal>
  );
};

export default AvatarPicker;
