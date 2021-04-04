import db from 'firebaseConfigs/db';
import { DocumentData } from '@firebase/firestore-types';
import BookMark from 'types/BookMark';
import * as T from 'types/API';

export const getPostData = async (postRef: DocumentData) => {
  try {
    const response = await postRef.get();
    const postData = response.data();
    postData['docId'] = response.id;
    return postData ? postData : null;
  } catch (error) {
    throw error;
  }
};

/** get All BookMark Reviews*/
export const getBookMarkedReviews = async (
  userId: string
): T.APIResponse<BookMark[]> => {
  try {
    const response = await db.collection('bookmarks').doc(userId).get();
    const postRefs = response.get('postRefs');
    let postLists = [] as BookMark[];
    for (const ref of postRefs) {
      const data = await getPostData(ref);
      data && postLists.push(data);
    }
    postLists = postLists.map((v) => ({
      docId: v.docId,
      placeInfo: v.placeInfo,
    }));
    return {
      isError: false,
      data: postLists,
    };
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
      const index = postIds.findIndex((v) => v === postId);
      postIds = postIds.filter((v) => v !== postId);
      postRefs = postRefs.filter((_, i) => i !== index);
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
