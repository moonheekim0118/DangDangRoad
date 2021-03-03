import db from 'firebaseConfigs/db';
import * as T from 'types/API';

const DATA_LIMIT = 8;

export const createReview = async (
  data: T.writeReviewParams
): T.APIResult<null> => {
  try {
    data['createdAt'] = Date.now();
    // add User Ref by user Id
    data['userRef'] = db.collection('users').doc(data.userId);
    await db.collection('reviews').add(data);
    return { status: 200, contents: null };
  } catch (error) {
    throw { message: error.code };
  }
};

// extract user data by userRef
const getUserData = async (userRef): Promise<T.userContents> => {
  try {
    const response = await userRef.get();
    const userData = response.data();
    if (userData) {
      return userData;
    } else {
      return { profilePic: undefined, nickname: '탈퇴한 사용자' };
    }
  } catch (error) {
    throw error;
  }
};

const extractReviewData = async (response): Promise<T.reviewResult> => {
  try {
    let reviews: T.lightReviewData[] = [];
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

export const getReviewsFirst = async (): T.APIResult<T.reviewResult> => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .limit(DATA_LIMIT)
      .get();

    const contents = await extractReviewData(response);
    return { status: 200, contents };
  } catch (error) {
    throw { message: error.code };
  }
};

/**
 *  this function is for data fetch when user
 *  clicked 'More' button
 */
export const getReviewsMore = async (
  key: string
): T.APIResult<T.reviewResult> => {
  try {
    const response = await db
      .collection('reviews')
      .orderBy('createdAt', 'desc')
      .startAfter(key)
      .limit(DATA_LIMIT)
      .get();
    const contents = await extractReviewData(response);
    return { status: 200, contents };
  } catch (error) {
    throw { message: error.code };
  }
};

/** get sinlge Review By Id */
export const getReviewById = async (
  id: string
): T.APIResult<T.reviewData | null> => {
  try {
    const response = await db.collection('reviews').doc(id).get();
    const data = response.data();
    if (data) {
      data['docId'] = id;
      data['userData'] = await getUserData(data['userRef']);
    }

    return { status: 200, contents: (data as T.reviewData) || null };
  } catch (error) {
    throw { message: error.code };
  }
};

// /** get Reivews by Search-Keyword */
// /** should use third-party */
// export const getReveiwByKeyword = async (keyword: string): T.APIResult => {
//   try {
//     const response = await db
//       .collection('reviews')
//       .where('placeInfo.address_name', '>=', keyword)
//       .orderBy('createdAt', 'desc')
//       .limit(DATA_LIMIT)
//       .get();

//     const contents = await extractReviewData(response);
//     console.log(contents);
//     return { status: 200, contents };
//   } catch (error) {
//     console.log(error);
//     throw { message: error.code };
//   }
// };
