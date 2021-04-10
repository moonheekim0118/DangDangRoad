import styled from '@emotion/styled';
import { baseModalStyle } from 'common/style/baseStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  > * {
    margin-left: 1.2rem;
  }
`;

export const Label = styled.label`
  padding: 10px 0;
  font-weight: bold;
  &::before {
    content: ' *';
    color: var(--colors-red);
  }
`;

export const DetailContainer = styled.div`
  width: 600px;
  height: 500px;
  padding: 25px;
  background-color: #fff;
  border-radius: 25px;
  overflow-y: scroll;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  ${baseModalStyle}

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

export const Contents = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
`;
