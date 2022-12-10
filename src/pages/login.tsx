import { Loading } from 'components/UI';
import { Login } from 'components/Auth';
import { useUser } from 'hooks';
import Head from 'next/head';
import routes from 'common/constant/routes';

const LoginPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? (
    <>
      <Head>
        <title>댕댕로드 | 로그인</title>
        <meta property="og:title" content="댕댕로드 로그인" key="ogtitle" />
        <meta
          property="og:description"
          content="댕댕로드 로그인 페이지 구글 로그인"
          key="ogdesc"
        />
      </Head>
      <Login />
    </>
  ) : (
    <Loading />
  );
};

export default LoginPage;
