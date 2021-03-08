import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Container = styled.nav`
  width: 100%;
  background-color: ${colorCode['blue']};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  padding: 10px 20px;
  margin-top: 15px;
`;

export const Item = styled.div`
  width: 100%;
  padding: 20px;
  border-top: 1px solid #fff;
`;
