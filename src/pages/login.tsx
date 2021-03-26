import React from 'react';
import { Loading } from 'components/ui';
import { Login } from 'components/auth';
import { useUser } from 'hooks';
import Head from 'next/head';
import routes from 'common/constant/routes';

const LoginPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? (
    <>
      <Head>
        <title>댕댕로드 | 로그인</title>
      </Head>
      <Login />
    </>
  ) : (
    <Loading />
  );
};

export default LoginPage;
