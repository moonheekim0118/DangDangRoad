import { parseCookies } from 'nookies';
import 'firebase/auth';
import verifyCookie from '../remotes/verifyCookie';

const getAuthentication = async (context) => {
  let propsObject = {
    authenticated: false,
    usermail: '',
  };
  const cookies = parseCookies(context);

  if (cookies.user) {
    const authentication = await verifyCookie(cookies.user);
    propsObject.authenticated = authentication
      ? authentication.authenticated
      : false;
    propsObject.usermail = authentication ? authentication.usermail : '';
  }

  return {
    props: propsObject,
  };
};

export default getAuthentication;
