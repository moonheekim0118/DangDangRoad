import React from 'react';
import styled from '@emotion/styled';
import { baseModalStyle } from 'util/baseStyle';

const WritePost = () => {
  return <Container>끄억</Container>;
};

const Container = styled.div`
  ${baseModalStyle}
  width:500px;
  height: 650px;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  @media only screen and (max-width: 540px) {
    width: 90%;
    height: 80%;
  }
`;

export default WritePost;
