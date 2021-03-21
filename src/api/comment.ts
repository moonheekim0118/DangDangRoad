import db from 'firebaseConfigs/db';
import * as T from 'types/API';
import { COMMENT_DATA_LIMIT } from 'common/constant/number';
import { getUserData } from 'api/review';

// //get comments by 5

// const extractCommentData = async (response): Promise<T.CommentData> => {
//   try {
//   } catch (error) {}
// };

// export const getComments = async (
//   postId: string,
//   key?: string
// ): T.APIResponse<T.CommentResult> => {
//   try {
//     const response = await db
//       .collection('comments')
//       .where('postId', '==', postId)
//       .limit(COMMENT_DATA_LIMIT)
//       .get();
//     return { isError: false, data: '' };
//   } catch (error) {
//     throw error;
//   }
// };

// // write comment

// export const writeComment = async () => {
//   try {
//   } catch (error) {
//     throw error;
//   }
// };

// // remove comment

// export const removeComment = async () => {
//   try {
//   } catch (error) {
//     throw error;
//   }
// };
