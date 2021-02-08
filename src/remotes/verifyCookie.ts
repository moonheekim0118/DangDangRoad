import 'firebase/auth';
import getFirebaseAdmin from '../../firebase/admin';

const verifyCookie = async (cookie) => {
  const admin = await getFirebaseAdmin();
  if (!admin) return null;
  let usermail = '';
  let bAuth = false;
  await admin
    .auth()
    .verifySessionCookie(cookie, true)
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
