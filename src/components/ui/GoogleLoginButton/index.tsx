import React, { ButtonHTMLAttributes } from 'react';
import googleLogo from './logo';
import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';

const GoogleLoginButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Container type="button" {...props}>
      <Logo>{googleLogo}</Logo>
      <Title>구글 로그인하기</Title>
    </Container>
  );
};

const Container = styled.button`
  width: 250px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  padding: 18px 20px;
  text-align: center;
  cursor: pointer;
  color: ${colorCode['deep-gray']};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease;

  &:hover {
    color: ${colorCode['blue']};
    box-shadow: 0px 0px 5px 0px rgba(2, 19, 188, 0.75);
  }

  &:focus {
    outline: none;
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 0px;
  top: 60%;
  transform: translateY(-50%);
`;

const Title = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 15px;
`;

export default GoogleLoginButton;
