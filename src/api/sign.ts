import getFirebase from 'firebaseConfigs/firebase';
import db from 'firebaseConfigs/db';
import errorExTxt from 'util/erreorExTxt';
import removeCookie from 'libs/removeCookie';
import createUserToken from 'libs/createUserToken';
import { ReqResult } from 'types/API';

/**
 *  API functions related to Sign
 *  Sign In , Sign Out, Sing Up and Add full-User-Data in FireStore
 */

const firebase = getFirebase();

/** add UserInfo in firestore */
const addUser = async (
  uid: string,
  email: string,
  nickname: string,
  profilePic: string = ''
) => {
  try {
    await db.collection('users').doc(uid).set({ email, nickname, profilePic });
  } catch (error) {
    throw error;
  }
};

/** Google-Auth Login */
export const googleSignIn = async (): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    if (provider) {
      const response = await auth.signInWithPopup(provider);
      if (response.user) {
        const user = response.user;
        const email = user.email || '';
        const nickname = user.displayName || '';
        const profilePic = user.photoURL || '';
        const token = await user.getIdToken(); // get Firebase User Token
        const uid = user.uid; // User id
        // Check if this user is stored in Firestore's user db
        const snapshot = await db.collection('users').doc(uid).get();
        if (!snapshot.exists) {
          // if it's new user
          await addUser(uid, email, nickname, profilePic);
        }
        await createUserToken(token); // to persist Auth
      }
    }
    return { isError: false };
  } catch (error) {
    // If user closed up the login pop-up , not gonna treat this as error
    if (error.code === 'auth/popup-closed-by-user') {
      return { isError: false };
    }
    return { isError: true, errorMessage: '잠시후 다시 시도해주세요' };
  }
};

/** Sign in function  */
export const signIn = async (
  email: string,
  password: string
): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    const response = await auth.signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      // check if User's Email is verifed or not
      if (!response.user.emailVerified) {
        throw { code: 'Not verfied' };
      }
      // to persist Auth
      const token = await response.user.getIdToken();
      await createUserToken(token);
    }
    return { isError: false };
  } catch (error) {
    const errorMessage = errorExTxt(error.code);
    return { isError: true, errorMessage };
  }
};

/** sign up function */
export const signUp = async (
  email: string,
  nickname: string,
  password: string
): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // create User successfully
    if (userCredential.user && auth.currentUser) {
      // add User's full data in firestore
      await addUser(userCredential.user.uid, email, nickname);
      const user = await auth.currentUser;
      // send confirm mail for Verification
      await user.sendEmailVerification();
      // signOut
      await signOut();
    }
    return { isError: false };
  } catch (error) {
    const errorMessage = errorExTxt(error.code);
    return { isError: true, errorMessage };
  }
};

/** Sign out function */
export const signOut = async (): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    await auth.signOut(); // sign out
    await removeCookie(); // remove Session-Cookie
    return { isError: false };
  } catch (error) {
    const errorMessage = errorExTxt(error.code);
    return { isError: true, errorMessage };
  }
};
