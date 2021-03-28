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
  updateContents: UserContents;
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
  reviews: LightReviewData[];
  lastKey: string;
}

export interface CommentResult {
  comments: CommentData[];
  lastKey: string;
}

export interface BookMarkResult {
  isBookMarked: boolean;
  postId: string;
}

export interface BookMarkListType {
  docId: string;
  placeInfo: {
    address_name: string;
    place_name: string;
  };
}

export interface BookMarkListResult {
  length: number;
  bookMarkList: BookMarkListType[];
}

export interface ReviewData extends WriteReviewParams {
  docId: string;
  userData: UserContents;
  createdAt: number;
}

export interface LightReviewData {
  docId: string;
  thumbNail: string | null;
  placeName: string;
  createdAt: number;
  commentsLength?: number;
}

export interface CommentData {
  docId: string;
  postId: string;
  userId: string;
  userData: UserContents;
  contents: string;
  createdAt: string;
}

export interface UserContents {
  nickname: string;
  profilePic?: string;
}

export interface SuccessType<T = null> {
  isError: false;
  data: T;
}

export type FileType = Blob | Uint8Array | ArrayBuffer;

export type APIResponse<T = null> = Promise<SuccessType<T>>;

export const defaultSuccess: SuccessType = { isError: false, data: null };
