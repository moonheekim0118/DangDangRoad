import getFirebase from 'firebaseConfigs/firebase';
import db from 'firebaseConfigs/db';
import createUserToken from 'libs/createUserToken';
import axios from 'axios';
import * as T from 'types/API';

const firebase = getFirebase();
const auth = firebase.auth();

/** update profile */
export const updateProfile = async (
  data: T.updateProfileParams
): T.APIResponse<T.userContents> => {
  try {
    await db.collection('users').doc(data.id).update(data.updateContents);
    return { isError: false, data: data.updateContents };
  } catch (error) {
    throw error;
  }
};

/** update password  */
export const updatePassword = async (
  data: T.updatePasswordParams
): T.APIResponse => {
  try {
    const path = '/api/updatePassword';
    const headers = { 'Content-Type': 'application/json' };
    const response = await axios.post(path, data, { headers });
    const customToken = response.data; // given Custom token from server
    // get User from Custom token
    const User = await (await auth.signInWithCustomToken(customToken)).user;
    if (User) {
      // generate Id Token to Re-Auth
      const IdToken = await User.getIdToken();
      await createUserToken(IdToken); // Re-Auth
    }
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

/** Destroy User */
export const destroyAccount = async (id: string): T.APIResponse => {
  try {
    const path = '/api/destroyUser';
    const data = { id };
    await axios.delete(path, { data });
    await db.collection('users').doc(id).delete();
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

/** get User info by Id */
export const getUserById = async (
  id: string
): T.APIResponse<T.userContents> => {
  try {
    const response = await db.collection('users').doc(id).get();
    const data = response.data();
    let userData = { profilePic: '', nickname: '탈퇴한 사용자' };
    if (data) {
      userData = { profilePic: data.profilePic, nickname: data.nickname };
    }
    return { isError: false, data: userData };
  } catch (error) {
    throw error;
  }
};
