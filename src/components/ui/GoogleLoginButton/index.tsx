import React, { useEffect } from 'react';
import googleLogo from './logo';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { GOOGLE_LOGIN_CAPTION } from 'common/constant/string';
import { colorCode } from 'common/style/color';
import { googleSignIn } from 'api/sign';
import routes from 'common/constant/routes';
import Router from 'next/router';

import styled from '@emotion/styled';

const GoogleLoginButton = () => {
  const dispatch = useNotificationDispatch();

  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(googleSignIn);
  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        break;
      case FAILURE:
        fetchResult.error && dispatch(showError(fetchResult.error));
        setDefault();
    }
  }, [fetchResult]);

  return (
    <Container type="button" onClick={() => fetchDispatch({ type: REQUEST })}>
      <Logo>{googleLogo}</Logo>
      <Title>{GOOGLE_LOGIN_CAPTION}</Title>
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
