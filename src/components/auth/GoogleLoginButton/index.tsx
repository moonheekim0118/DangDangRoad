import React, { useEffect, useCallback } from 'react';
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

const GoogleLoginButton = (): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [googleAuthResult, googleAuthFetch, googleAuthSetDefault] = useApiFetch(
    googleSignIn
  );

  useEffect(() => {
    switch (googleAuthResult.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        break;
      case FAILURE:
        if (googleAuthResult.error) {
          notiDispatch(showError(googleAuthResult.error));
          googleAuthSetDefault();
        }
    }
  }, [googleAuthResult]);

  const googleSignInHandler = useCallback(() => {
    googleAuthFetch({ type: REQUEST });
  }, []);

  return (
    <S.Container type="button" onClick={googleSignInHandler}>
      <S.Logo>{googleLogo}</S.Logo>
      <S.Title>{GOOGLE_LOGIN_CAPTION}</S.Title>
    </S.Container>
  );
};
export default GoogleLoginButton;
