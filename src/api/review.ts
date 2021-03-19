import db from 'firebaseConfigs/db';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { EMPTY_USER_NICKNAME } from 'common/constant/string';
import * as T from 'types/API';

/** create new Review */
export const createReview = async (
  data: T.WriteReviewParams
): T.APIResponse<null> => {
  try {
    data['createdAt'] = Date.now();
    // add User Ref by user Id
    data['userRef'] = db.collection('users').doc(data.userId);
    await db.collection('reviews').add(data);
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

/** update reviews */
export const updateReview = async (
  id: string,
  data: T.WriteReviewParams
): T.APIResponse => {
  try {
    data['createdAt'] = Date.now();
    await db.collection('reviews').doc(id).update(data);
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

/** remove review */
export const removeReview = async (id: string): T.APIResponse => {
  try {
    await db.collection('reviews').doc(id).delete();
    return T.defaultSuccess;
  } catch (error) {
    throw error;
  }
};

// extract user data by userRef
export const getUserData = async (userRef): Promise<T.UserContents> => {
  try {
    const response = await userRef.get();
    const userData = response.data();
    if (userData) {
      return userData;
    } else {
      return { nickname: EMPTY_USER_NICKNAME };
    }
  } catch (error) {
    throw error;
  }
};

const extractReviewData = async (response): Promise<T.ReviewResult> => {
  try {
    let reviews: T.LightReviewData[] = [];
    let lastKey = '';
    response.forEach((doc) => {
      const data = doc.data();
      const review = {
        docId: doc.id,
        thumbNail: data.imageList ? data.imageList[0] : null,
        placeName: data.placeInfo.place_name,
        createdAt: data.createdAt,
      };
      reviews.push(review);
      lastKey = data.createdAt;
    });
    return { reviews, lastKey };
  } catch (error) {
    throw error;
  }
};

export const getReviewsFirst = async (): T.APIResponse<T.ReviewResult> => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .limit(REVIEW_DATA_LIMIT)
      .get();

    const data = await extractReviewData(response);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

/**
 *  this function is for data fetch when user
 *  clicked 'More' button
 */
export const getReviewsMore = async (
  key: string
): T.APIResponse<T.ReviewResult> => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .startAfter(key)
      .limit(REVIEW_DATA_LIMIT)
      .get();
    const data = await extractReviewData(response);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

/** get sinlge Review By Id */
export const getReviewById = async (
  id: string
): T.APIResponse<T.ReviewData> => {
  try {
    const response = await db.collection('reviews').doc(id).get();
    const data = response.data();
    if (data) {
      data['docId'] = id;
      data['userData'] = await getUserData(data['userRef']);
      return { isError: false, data: data as T.ReviewData };
    } else {
      throw { code: 'Not exists data' };
    }
  } catch (error) {
    throw error;
  }
};

/** get Reviews data size */
export const getReviewsCount = async (): T.APIResponse<number> => {
  try {
    const snapshot = await db.collection('reviews').get();
    return { isError: false, data: snapshot.size };
  } catch (error) {
    throw error;
  }
};

/** get Reviews */
