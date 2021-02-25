import getFirebase from 'firebaseConfigs/firebase';
import db from 'firebaseConfigs/db';
import { ReviewDataType } from 'types/Review';

export const createReview = async (data: ReviewDataType) => {
  try {
    await db.collection('reviews').add(data);
    return { isError: false };
  } catch (error) {
    console.log(error);
    return { isError: true };
  }
};
