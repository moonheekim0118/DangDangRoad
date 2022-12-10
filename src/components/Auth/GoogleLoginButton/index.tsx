import googleLogo from './logo';
import useApiFetch, { REQUEST } from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { GOOGLE_LOGIN_CAPTION } from 'common/constant/string';
import { googleSignIn } from 'api/sign';
import { showError } from 'action';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as S from './style';

const GoogleLoginButton = (): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [result, dispatch] = useApiFetch(googleSignIn, {
    onSuccess: () => {
      Router.push(routes.HOME);
    },
    onFailure: (response) => {
      notiDispatch(showError(response.error));
    },
  });

  return (
    <S.Container type="button" onClick={() => dispatch({ type: REQUEST })}>
      <S.Logo>{googleLogo}</S.Logo>
      <S.Title>{GOOGLE_LOGIN_CAPTION}</S.Title>
    </S.Container>
  );
};
export default GoogleLoginButton;
