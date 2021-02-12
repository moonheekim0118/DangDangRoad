import { parseCookies } from 'nookies';
import 'firebase/auth';
import verifyCookie from 'remotes/verifyCookie';
import { GetServerSidePropsContext } from 'next';

/** 서버가 브라우저로부터 받아온 context 에서 쿠키를 파싱
 *  파싱한 쿠키를 verifyCookie (파이어베이스 관리자 권한) 으로 인증
 *  인증 완료시 authenticated===true
 */
const getAuthentication = async (context: GetServerSidePropsContext) => {
  let propsObject = {
    authenticated: false,
    userId: '',
  };
  const cookies = parseCookies(context);

  if (cookies.user) {
    const authentication = await verifyCookie(cookies.user);
    propsObject.authenticated = authentication
      ? authentication.authenticated
      : false;
    propsObject.userId = authentication ? authentication.userId : '';
  }
  return {
    props: propsObject,
  };
};

export default getAuthentication;
