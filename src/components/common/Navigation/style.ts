import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

const Container = styled.nav`
  width: 100%;
  border-top: 1px solid #fff;
  background-color: ${colorCode['blue']};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  padding: 10px 20px;
  margin-top: 15px;
`;

export default Container;
