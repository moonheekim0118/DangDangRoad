import getFirebase from 'firebaseConfigs/firebase';
import db from 'firebaseConfigs/db';
import { ReqResult } from 'types/API';
import createUserToken from 'libs/createUserToken';
import axios from 'axios';

const firebase = getFirebase();
const auth = firebase.auth();

interface userContents {
  nickname?: string;
  profilePic?: string;
}

/** update profile */
export const updateProfile = async (
  id: string,
  updateContents: userContents
): Promise<ReqResult> => {
  try {
    await db.collection('users').doc(id).update(updateContents);
    return { isError: false };
  } catch (error) {
    return { isError: true, errorMessage: '잠시후에 다시 시도해주세요' };
  }
};

/** update password  */
export const updatePassword = async (
  id: string,
  newPassword: string
): Promise<ReqResult> => {
  try {
    const path = '/api/updatePassword';
    const data = { id, newPassword };
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
    return {
      isError: false,
    };
  } catch (error) {
    return {
      isError: true,
      errorMessage: '잠시후 다시 시도해주세요',
    };
  }
};

/** Destroy User */
export const destroyAccount = async (id: string) => {
  try {
    const path = '/api/destroyUser';
    const data = { id };
    await axios.delete(path, { data });
    await db.collection('users').doc(id).delete();
    return {
      isError: false,
    };
  } catch (error) {
    console.log(error);
    return {
      isError: true,
      errorMessage: '잠시후 다시 시도해주세요',
    };
  }
};
