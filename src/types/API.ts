export interface AuthResult {
  userId: string;
  isLoggedIn: boolean;
}

export interface signUpParams {
  email: string;
  nickname: string;
  password: string;
}

export interface signInParams {
  email: string;
  password: string;
}

export interface updateProfileParams {
  id: string;
  updateContents: userContents;
}

export interface updatePasswordParams {
  id: string;
  newPassword: string;
}

export interface writeReviewParams {
  userId: string;
  hasParkingLot: string;
  hasOffLeash: string;
  recommendation: string;
  freeText: string;
  imageList: string[] | null;
  placeInfo: {
    address_name: string;
    place_name: string;
    x: string;
    y: string;
  };
}

export interface reviewResult {
  reviews: lightReviewData[];
  lastKey: string;
}

export interface reviewData extends writeReviewParams {
  docId: string;
  userData: userContents;
  createdAt: number;
}

export interface lightReviewData {
  docId: string;
  thumbNail: string | null;
  placeName: string;
  createdAt: number;
}

export interface userContents {
  nickname?: string;
  profilePic?: string;
}

export interface successType<T = null> {
  isError: false;
  data: T;
}

export type fileType = Blob | Uint8Array | ArrayBuffer;

export type APIResponse<T = null> = Promise<successType<T>>;

export const defaultSuccess: successType = { isError: false, data: null };
