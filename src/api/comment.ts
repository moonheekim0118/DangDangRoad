import db from 'firebaseConfigs/db';
import * as T from 'types/API';
import Comment from 'types/Comment';
import { COMMENT_DATA_LIMIT } from 'common/constant/number';
import { getUserData } from 'api/review';
import { QuerySnapshot } from '@firebase/firestore-types';

interface tempCommentData extends Comment {
  userRef: any;
}

// extract & parse Comment data from Firebase response
const extractCommentData = async (
  response: QuerySnapshot
): Promise<T.CommentResult> => {
  try {
    let comments = [] as Comment[];
    let temp = [] as tempCommentData[];
    let lastKey = '';
    response.forEach((doc) => {
      const data = doc.data();
      const comment = {
        docId: doc.id,
        contents: data.contents,
        postId: data.postId,
        userId: data.userId,
        userRef: data.userRef,
        createdAt: data.createdAt,
      } as tempCommentData;
      temp.push(comment);
      lastKey = data.createdAt;
    });

    for (const commentData of temp) {
      commentData['userData'] = await getUserData(commentData.userRef);
      delete commentData['userRef'];
    }
    comments = temp;
    return { comments, lastKey };
  } catch (error) {
    throw error;
  }
};

/** get Comments By 5*/
export const getComments = async (
  postId: string,
  key?: string
): T.APIResponse<T.CommentResult> => {
  try {
    let response = '' as unknown;
    if (key) {
      response = await db
        .collection('comments')
        .where('postId', '==', postId)
        .orderBy('createdAt', 'desc')
        .startAfter(key)
        .limit(COMMENT_DATA_LIMIT)
        .get();
    } else {
      response = await db
        .collection('comments')
        .where('postId', '==', postId)
        .orderBy('createdAt', 'desc')
        .limit(COMMENT_DATA_LIMIT)
        .get();
    }
    const data = await extractCommentData(response as QuerySnapshot);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

// write comment

export const createComment = async (
  data: T.WriteCommentParams
): T.APIResponse<Comment> => {
  try {
    data['userRef'] = db.collection('users').doc(data.userId);
    data['createdAt'] = Date.now();
    const response = await db.collection('comments').add(data);
    const result = await response.get();
    const newComment = result.data();
    if (newComment) {
      newComment['docId'] = result.id;
      newComment['userData'] = await getUserData(newComment['userRef']);
      delete newComment['userRef'];
      return { isError: false, data: newComment as Comment };
    } else {
      throw { code: 'Not exists Data' };
    }
  } catch (error) {
    throw error;
  }
};

// remove comment
export const removeComment = async (id: string): T.APIResponse<string> => {
  try {
    await db.collection('comments').doc(id).delete();
    return { isError: false, data: id };
  } catch (error) {
    throw error;
  }
};

export const getCommentsCount = async (id: string): T.APIResponse<number> => {
  try {
    const snpashot = await db
      .collection('comments')
      .where('postId', '==', id)
      .get();
    return { isError: false, data: snpashot.size };
  } catch (error) {
    throw error;
  }
};
