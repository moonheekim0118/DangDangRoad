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
): T.APIResult => {
  try {
    await db.collection('users').doc(data.id).update(data.updateContents);
    return { status: 200 };
  } catch (error) {
    throw { message: error.code };
  }
};

/** update password  */
export const updatePassword = async (
  data: T.updatePasswordParams
): T.APIResult => {
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
    return { status: 200 };
  } catch (error) {
    throw { message: error.code };
  }
};

/** Destroy User */
export const destroyAccount = async (id: string): T.APIResult => {
  try {
    const path = '/api/destroyUser';
    const data = { id };
    await axios.delete(path, { data });
    await db.collection('users').doc(id).delete();
    return { status: 200 };
  } catch (error) {
    throw { message: error.code };
  }
};
