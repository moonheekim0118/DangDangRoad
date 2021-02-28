import db from 'firebaseConfigs/db';
import * as T from 'types/API';

const DATA_LIMIT = 15;

export const createReview = async (data: T.writeReviewParams): T.APIResult => {
  try {
    data['createdAt'] = Date.now();
    await db.collection('reviews').add(data);
    return { status: 200 };
  } catch (error) {
    throw { message: error.code };
  }
};

export const getReviewById = async (id: string): T.APIResult => {
  try {
    const response = await db.collection('reviews').doc(id).get();
    const data = response.data();
    return { status: 200, contents: data };
  } catch (error) {
    throw { message: error.code };
  }
};

/**
 *  this function for first data fetch
 *
 */
export const getReviewsFirst = async (): T.APIResult => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .limit(DATA_LIMIT)
      .get();

    let reviews: T.ReviewData[] = [];
    let lastKey = '';
    response.forEach((doc) => {
      const data = doc.data();
      const review = {
        docId: doc.id,
        userId: data.userId,
        hasParkingLot: data.hasParkingLot,
        hasOffLeash: data.hasOffLeash,
        recommendation: data.recommendation,
        freeText: data.freeText,
        imageList: data.imageList,
        placeInfo: data.placeInfo,
        createdAt: data.createdAt,
      };
      reviews.push(review);
      lastKey = data.createdAt;
    });
    return { status: 200, contents: { reviews, lastKey } };
  } catch (error) {
    throw { message: error.code };
  }
};

/**
 *  this function is for data fetch when user
 *  clicked 'More' button
 */
export const getReviewsMore = async (key: string): T.APIResult => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .startAfter(key)
      .limit(DATA_LIMIT)
      .get();
    let reviews: T.ReviewData[] = [];
    let lastKey = '';
    response.forEach((doc) => {
      const data = doc.data();
      const review = {
        docId: doc.id,
        userId: data.userId,
        hasParkingLot: data.hasParkingLot,
        hasOffLeash: data.hasOffLeash,
        recommendation: data.recommendation,
        freeText: data.freeText,
        imageList: data.imageList,
        placeInfo: data.placeInfo,
        createdAt: data.createdAt,
      };
      reviews.push(review);
      lastKey = data.createdAt;
    });
    return { status: 200, contents: { reviews, lastKey } };
  } catch (error) {
    throw { message: error.code };
  }
};
