import db from 'firebaseConfigs/db';
import { ReqResult } from 'types/API';

interface userContents {
  nickname?: string;
  profilePic?: string;
}

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
