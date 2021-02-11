import 'firebase/auth';
import getFirebaseAdmin from '../../firebase/admin';

/** 파이어베이스 관리자 권한으로 쿠키 인증 */
const verifyCookie = async (cookie) => {
  try {
    const admin = await getFirebaseAdmin();
    if (!admin) return null;
    let userId = '';
    let bAuth = false;
    const decodedClaims = await admin.auth().verifySessionCookie(cookie, true);
    if (decodedClaims) {
      bAuth = true;
      userId = decodedClaims.uid;
    }
    return {
      authenticated: bAuth,
      userId,
    };
  } catch (error) {
    return null;
  }
};

export default verifyCookie;
