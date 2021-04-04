import { WriteReviewParams } from './API';
import { User } from './User';

export interface LightReview {
  docId: string;
  thumbNail: string | null;
  placeName: string;
  createdAt: number;
  commentsLength?: number;
}

export interface FullReview extends WriteReviewParams {
  docId: string;
  userData: User;
  createdAt: number;
}
