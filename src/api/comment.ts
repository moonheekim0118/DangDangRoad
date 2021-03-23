import db from 'firebaseConfigs/db';
import * as T from 'types/API';
import { COMMENT_DATA_LIMIT } from 'common/constant/number';
import { getUserData } from 'api/review';

//get comments by 5

interface tempCommentData extends T.CommentData {
  userRef: any;
}

const extractCommentData = async (response): Promise<T.CommentResult> => {
  try {
    let comments: T.CommentData[] = [];
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

export const getComments = async (
  postId: string,
  key?: string
): T.APIResponse<T.CommentResult> => {
  try {
    const response = await db
      .collection('comments')
      .where('postId', '==', postId)
      .limit(COMMENT_DATA_LIMIT)
      .get();

    const data = await extractCommentData(response);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

// write comment

export const createComment = async (
  data: T.WriteCommentParams
): T.APIResponse<T.CommentData> => {
  try {
    data['userRef'] = db.collection('users').doc(data.userId);
    const response = await db.collection('comments').add(data);
    const result = await response.get();
    const newComment = result.data();
    if (newComment) {
      newComment['docId'] = result.id;
      newComment['userData'] = await getUserData(newComment['userRef']);
      delete newComment['userRef'];
      return { isError: false, data: newComment as T.CommentData };
    } else {
      throw { code: 'Not exists Data' };
    }
  } catch (error) {
    throw error;
  }
};

// remove comment

export const removeComment = async () => {
  try {
  } catch (error) {
    throw error;
  }
};
