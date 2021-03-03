import getFirebase from 'firebaseConfigs/firebase';
import db from 'firebaseConfigs/db';
import removeCookie from 'libs/removeCookie';
import createUserToken from 'libs/createUserToken';
import * as T from 'types/API';

/**
 *  API functions related to Sign
 *  Sign In , Sign Out, Sing Up and Add full-User-Data in FireStore
 */

const firebase = getFirebase();
const auth = firebase.auth();

/** add UserInfo in firestore */
const addUser = async (
  id: string,
  email: string,
  nickname: string,
  profilePic: string = ''
) => {
  try {
    await db.collection('users').doc(id).set({ email, nickname, profilePic });
  } catch (error) {
    throw error;
  }
};

/** Google-Auth Login */
export const googleSignIn = async (): T.APIResponse => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    if (provider) {
      const response = await auth.signInWithPopup(provider);
      if (response.user) {
        const user = response.user;
        const email = user.email || '';
        const nickname = user.displayName || '';
        const profilePic = user.photoURL || '';
        const token = await user.getIdToken(); // get Firebase User Token
        const id = user.uid; // User id
        // Check if this user is stored in Firestore's user db
        const snapshot = await db.collection('users').doc(id).get();
        if (!snapshot.exists) {
          // if it's new user
          await addUser(id, email, nickname, profilePic);
        }
        await createUserToken(token); // to persist Auth
      }
    }
    return T.defaultSuccess;
  } catch (error) {
    // If user closed up the login pop-up , not gonna treat this as error
    if (error.code === 'auth/popup-closed-by-user') {
      return T.defaultSuccess;
    }
    throw error;
  }
};

/** Sign in function  */
export const signIn = async (data: T.signInParams): T.APIResponse => {
  try {
    const response = await auth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
    if (response && response.user) {
      // check if User's Email is verifed or not
      if (!response.user.emailVerified) {
        throw { code: 'Not verfied' };
      }
      // to persist Auth
      const token = await response.user.getIdToken();
      await createUserToken(token);
    }
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

/** sign up function */
export const signUp = async (data: T.signUpParams): T.APIResponse => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    // create User successfully
    if (userCredential.user && auth.currentUser) {
      // add User's full data in firestore
      await addUser(userCredential.user.uid, data.email, data.nickname);
      const user = await auth.currentUser;
      // send confirm mail for Verification
      await user.sendEmailVerification();
      // signOut
      await signOut();
    }
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

/** Sign out function */
export const signOut = async (): T.APIResponse => {
  try {
    await auth.signOut(); // sign out
    await removeCookie(); // remove Session-Cookie
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};
