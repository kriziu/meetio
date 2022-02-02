import Image from 'next/image';
import { FC } from 'react';

import styled from '@emotion/styled';

const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const Container = styled.div<{ size: number }>`
  border-radius: 50%;
  background-color: gray;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  position: relative;
`;

export const Avatar: FC<{
  imageURL: string;
}> = ({ imageURL }) => {
  return (
    <Container size={250}>
      {imageURL && imageURL !== '-1' && (
        <StyledImage
          src={imageURL}
          width={250}
          height={250}
          alt="Avatar"
          objectFit="cover"
        />
      )}
    </Container>
  );
};

export const AvatarSmall: FC<{ imageURL: string }> = ({ imageURL }) => {
  return (
    <Container size={50}>
      {imageURL && imageURL !== '-1' && (
        <StyledImage
          src={imageURL}
          width={50}
          height={50}
          alt="Avatar"
          objectFit="cover"
        />
      )}
    </Container>
  );
};

export const AvatarVerySmall: FC<{
  imageURL: string;
  onClick?: () => void;
}> = ({ imageURL, onClick }) => {
  return (
    <Container size={30} onClick={onClick}>
      {imageURL && imageURL !== '-1' && (
        <StyledImage
          src={imageURL}
          width={30}
          height={30}
          alt="Avatar"
          objectFit="cover"
        />
      )}
    </Container>
  );
};

export const AvatarIcon: FC<{
  imageURL: string;
}> = ({ imageURL }) => {
  return (
    <Container size={15} as="li">
      {imageURL && imageURL !== '-1' && (
        <StyledImage
          src={imageURL}
          width={15}
          height={15}
          alt="Avatar"
          objectFit="cover"
        />
      )}
    </Container>
  );
};
