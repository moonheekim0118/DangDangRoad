import { Loading } from 'components/UI';
import { SignUp } from 'components/Auth';
import { useUser } from 'hooks';
import Head from 'next/head';
import routes from 'common/constant/routes';

const SignUpPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? (
    <>
      <Head>
        <title>댕댕로드 | 회원가입</title>
        <meta property="og:title" content="댕댕로드 회원가입" key="ogtitle" />
        <meta
          property="og:description"
          content="댕댕로드 회원가입 페이지"
          key="ogdesc"
        />
      </Head>
      <SignUp />
    </>
  ) : (
    <Loading />
  );
};

export default SignUpPage;
