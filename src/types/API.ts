import * as Review from './Review';
import Comment from './Comment';
import { User } from './User';

export interface AuthResult {
  userId: string;
  isLoggedIn: boolean;
}

export interface SignUpParams {
  email: string;
  nickname: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface UpdateProfileParams {
  id: string;
  updateContents: User;
}

export interface UpdatePasswordParams {
  id: string;
  newPassword: string;
}

export interface WriteReviewParams {
  userId: string;
  hasParkingLot: string;
  hasOffLeash: string;
  recommendation: string;
  freeText: string;
  imageList: string[];
  placeInfo: {
    address_name: string;
    place_name: string;
    x: string;
    y: string;
  };
}

export interface WriteCommentParams {
  userId: string;
  postId: string;
  contents: string;
}

export interface ReviewResult {
  reviews: Review.LightReview[];
  lastKey: string;
}

export interface CommentResult {
  comments: Comment[];
  lastKey: string;
}

export interface BookMarkResult {
  isBookMarked: boolean;
  postId: string;
}

export interface SuccessType<T = null> {
  isError: false;
  data: T;
}

export type FileType = Blob | Uint8Array | ArrayBuffer;

export type APIResponse<T = null> = Promise<SuccessType<T>>;

export const defaultSuccess: SuccessType = { isError: false, data: null };

export enum Actions {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE',
}
