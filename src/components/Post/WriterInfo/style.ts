import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

export const TimeStamp = styled.span`
  color: ${colorCode['dark-gray']};
`;
