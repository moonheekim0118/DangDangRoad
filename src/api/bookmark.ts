import db from 'firebaseConfigs/db';
import * as T from 'types/API';

/** get Book Mark reviews by 5 limits */
export const getBookMarkedReviews = async (userId: string) => {
  try {
  } catch (error) {
    throw error;
  }
};

/** add to bookMark list for user (by UserId) */
export const addBookMarkReview = async (
  userId: string,
  postId: string
): T.APIResponse<string> => {
  try {
    const response = await db.collection('bookmarks').doc(userId).get();
    const postRef = db.collection('reviews').doc(postId);
    if (response.exists) {
      let postIds = response.get('postIds');
      let postRefs = response.get('postRefs');
      postIds.push(postId);
      postRefs.push(postRef);
      await db
        .collection('bookmarks')
        .doc(userId)
        .update({ postIds, postRefs });
    } else {
      // There is no bookmark database yet
      await db
        .collection('bookmarks')
        .doc(userId)
        .set({
          postIds: [postId],
          postRefs: [postRef],
        });
    }
    return { isError: false, data: postId };
  } catch (error) {
    throw error;
  }
};

/** remove from bookmark list from user (by UserId) */
export const removeBookMarkReview = async (
  userId: string,
  postId: string
): T.APIResponse<string> => {
  try {
    const response = await db.collection('bookmarks').doc(userId).get();
    let postIds = response.get('postIds');
    let postRefs = response.get('postRefs');
    if (postIds && postRefs) {
      const index = postIds.findIndex((v, i) => v === postId);
      postIds = postIds.filter((v, i) => v !== postId);
      postRefs = postRefs.filter((v, i) => i !== index);
      await db
        .collection('bookmarks')
        .doc(userId)
        .update({ postIds, postRefs });
    }
    return { isError: false, data: postId };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/** check if user bookmarked specfic post or not*/
export const checkBookMark = async (
  userId: string,
  postId: string
): T.APIResponse<T.BookMarkResult> => {
  try {
    const response = await db.collection('bookmarks').doc(userId).get();
    const data = response.get('postIds');
    return data
      ? {
          isError: false,
          data: { isBookMarked: data.includes(postId), postId },
        }
      : { isError: false, data: { isBookMarked: false, postId } };
  } catch (error) {
    throw error;
  }
};
