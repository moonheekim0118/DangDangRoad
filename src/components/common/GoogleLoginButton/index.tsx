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
import { googleSignIn } from 'api/sign';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as S from './style';

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
    <S.Container type="button" onClick={() => fetchDispatch({ type: REQUEST })}>
      <S.Logo>{googleLogo}</S.Logo>
      <S.Title>{GOOGLE_LOGIN_CAPTION}</S.Title>
    </S.Container>
  );
};
export default GoogleLoginButton;
