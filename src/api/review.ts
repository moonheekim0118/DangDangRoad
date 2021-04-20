import db from 'firebaseConfigs/db';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { EMPTY_USER_NICKNAME } from 'common/constant/string';
import { getCommentsCount } from 'api/comment';
import { DocumentData, QuerySnapshot } from '@firebase/firestore-types';
import { User } from 'types/User';
import * as Review from 'types/Review';
import * as T from 'types/API';

/** create new Review */
export const createReview = async (
  data: T.WriteReviewParams
): T.APIResponse => {
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
): T.APIResponse<T.WriteReviewParams> => {
  try {
    await db.collection('reviews').doc(id).update(data);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

/** remove review */
export const removeReview = async (id: string): T.APIResponse<string> => {
  try {
    await db.collection('reviews').doc(id).delete();
    return { isError: false, data: id };
  } catch (error) {
    throw error;
  }
};

// extract user data by userRef
export const getUserData = async (userRef: DocumentData): Promise<User> => {
  try {
    const response = await userRef.get();
    const userData = response.data();
    return userData ? userData : { nickname: EMPTY_USER_NICKNAME };
  } catch (error) {
    throw error;
  }
};

const extractReviewData = async (
  response: QuerySnapshot
): Promise<T.ReviewResult> => {
  try {
    let reviews: Review.LightReview[] = [];
    let lastKey = '';
    response.forEach((doc) => {
      const data = doc.data();
      const review = {
        docId: doc.id,
        thumbNail: data.imageList.length ? data.imageList[0] : null,
        placeName: data.placeInfo.place_name,
        createdAt: data.createdAt,
      };
      reviews.push(review);
      lastKey = data.createdAt;
    });
    for (const reviewData of reviews) {
      const legnthCount = await getCommentsCount(reviewData.docId);
      reviewData['commentsLength'] = legnthCount.data;
    }
    return { reviews, lastKey };
  } catch (error) {
    throw error;
  }
};

export const getReviewsFirst = async (
  key: string
): T.APIResponse<T.ReviewResult> => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .endBefore(+key)
      .get();
    const data = await extractReviewData(response);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

/** get Reviews with key */
export const getReviews = async (
  key?: string
): T.APIResponse<T.ReviewResult> => {
  try {
    let response = null as unknown;
    if (key) {
      response = await db
        .collection('reviews')
        .orderBy('createdAt', 'desc')
        .startAfter(+key)
        .limit(REVIEW_DATA_LIMIT)
        .get();
    } else {
      response = await db
        .collection('reviews')
        .orderBy('createdAt', 'desc')
        .limit(REVIEW_DATA_LIMIT)
        .get();
    }
    const data = await extractReviewData(response as QuerySnapshot);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

/** get sinlge Review By Id */
export const getReviewById = async (
  id: string
): T.APIResponse<Review.FullReview> => {
  try {
    const response = await db.collection('reviews').doc(id).get();
    const data = response.data();
    if (data) {
      data['docId'] = id;
      data['userData'] = await getUserData(data['userRef']);
      return { isError: false, data: data as Review.FullReview };
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
