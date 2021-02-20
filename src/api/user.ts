import db from 'firebaseConfigs/db';
import { ReqResult } from 'types/API';
import axios from 'axios';

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
    await axios.post(path, data, { headers });
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
