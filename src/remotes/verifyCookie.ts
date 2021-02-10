import 'firebase/auth';
import getFirebaseAdmin from '../../firebase/admin';

/** 파이어베이스 관리자 권한으로 쿠키 인증 */
const verifyCookie = async (cookie) => {
  const admin = await getFirebaseAdmin();
  if (!admin) return null;
  let usermail = '';
  let bAuth = false;
  await admin
    .auth()
    .verifySessionCookie(cookie, true) // 쿠키 인증
    .then((decodedClaims) => {
      bAuth = true;
      usermail = decodedClaims.email;
    })
    .catch((error) => {
      console.log(error);
      bAuth = false;
    });
  return {
    authenticated: bAuth,
    usermail,
  };
};

export default verifyCookie;
