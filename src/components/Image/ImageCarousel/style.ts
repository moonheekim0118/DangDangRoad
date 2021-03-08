import { baseModalStyle } from 'common/style/baseStyle';
import styled from '@emotion/styled';

export const Containter = styled.div`
  width: 50%;
  height: 100%;
  display: grid;
  place-items: center;
  ${baseModalStyle}

  @media only screen and (max-width: 780px) {
    width: 80%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 80%;
  padding: 20px;
  object-fit: cover;
`;
