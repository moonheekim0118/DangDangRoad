import styled from '@emotion/styled';
import { baseModalStyle } from 'common/style/baseStyle';

const Container = styled.div<{ isModal: boolean }>`
  width: 80vw;
  height: 80vh;
  margin: ${(props) => !props.isModal && '25px 0'};
  background-color: #fff;
  border-radius: 20px;
  border: ${(props) => !props.isModal && '2px solid #f4f4f4'};
  box-shadow: ${(props) =>
    props.isModal && '0px 0px 5px 0px rgba(0, 0, 0, 0.75)'};

  ${(props) => props.isModal && baseModalStyle};
`;

export default Container;
