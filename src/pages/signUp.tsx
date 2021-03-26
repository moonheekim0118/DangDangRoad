import React from 'react';
import { Loading } from 'components/ui';
import { SignUp } from 'components/auth';
import { useUser } from 'hooks';
import Head from 'next/head';
import routes from 'common/constant/routes';

const SignUpPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? (
    <>
      <Head>
        <title>댕댕로드 | 회원가입</title>
      </Head>
      <SignUp />
    </>
  ) : (
    <Loading />
  );
};

export default SignUpPage;
