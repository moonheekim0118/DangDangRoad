import db from 'firebaseConfigs/db';
import * as T from 'types/API';

export const createReview = async (data: T.writeReviewParams): T.APIResult => {
  try {
    await db.collection('reviews').add(data);
    return { status: 200 };
  } catch (error) {
    throw { message: error.code };
  }
};
