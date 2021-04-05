import { User } from './User';

export default interface Comment {
  docId: string;
  postId: string;
  userId: string;
  userData: User;
  contents: string;
  createdAt: number;
}
