import styled from '@emotion/styled';
import { notificationDot } from 'common/styles/notificationDot';

export const StyledA = styled.a<{ notify?: boolean }>`
  ${({ notify }) => notificationDot(5, -5, notify)}
`;
