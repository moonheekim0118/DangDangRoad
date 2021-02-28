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
  createdAt?: any;
}

export interface reviewResult {
  reviews: reviewData[];
  lastKey: string;
}

export interface reviewData extends writeReviewParams {
  docId: string;
  userData: userContents;
}

export interface userContents {
  nickname?: string;
  profilePic?: string;
}

export interface failType {
  isError: true;
  error: string;
}

export interface successType {
  isError: false;
  data: any;
}

export type fileType = Blob | Uint8Array | ArrayBuffer;

export type APIResponse = Promise<failType | successType>;

export type APIResult = Promise<{
  status: number;
  contents?: any;
}>;
