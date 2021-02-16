import 'firebase/auth';
import db from 'firebaseConfigs/db';
import getFirebaseAdmin from 'firebaseConfigs/admin';
import { AuthResult } from 'types/API';

/** Verify Cookie with Firebase Admin */
const verifyCookie = async (cookie: string): Promise<null | AuthResult> => {
  try {
    const admin = await getFirebaseAdmin();
    if (!admin) return null;
    let userId = '';
    let userInfo;
    const decodedClaims = await admin.auth().verifySessionCookie(cookie, true);
    if (decodedClaims) {
      userId = decodedClaims.uid;
      // get User Data from firebase
      const userData = await db.collection('users').doc(userId).get();
      if (!userData.exists) {
        throw 'No User';
      } else {
        userInfo = userData.data();
      }
      userInfo.userId = userId;
      userInfo.isLoggedIn = true;
    }
    return userInfo;
  } catch (error) {
    return null;
  }
};

export default verifyCookie;
