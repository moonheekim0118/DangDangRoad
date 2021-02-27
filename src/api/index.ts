import * as sign from './sign';
import * as review from './review';
import * as storage from './storage';
import * as user from './user';
import * as T from 'types/API';
import errorExTxt from 'util/erreorExTxt';

const successResponse: T.successType = { isError: false, data: '' };

const failResponse = (message: string): T.failType => {
  return {
    isError: true,
    error: errorExTxt(message),
  };
};

const api = {
  // sign Up
  signUp: async (data: T.signUpParams): T.APIResponse => {
    try {
      await sign.signUp(data);
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },
  // sign In
  signIn: async (data: T.signInParams): T.APIResponse => {
    try {
      await sign.signIn(data);
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },
  // google Sign In
  googleSignIn: async (): T.APIResponse => {
    try {
      await sign.googleSignIn();
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },
  // sign Out
  signOut: async (): T.APIResponse => {
    try {
      await sign.signOut();
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },
  // create Review
  createReview: async (data: T.writeReviewParams): T.APIResponse => {
    try {
      await review.createReview(data);
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },
  // upload Profile image
  uploadProfileImage: async (file: T.fileType): T.APIResponse => {
    try {
      const data = await storage.uploadProfileImage(file);
      successResponse.data = data.contents;
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // upload Post Images
  uploadPostImage: async (file: T.fileType[]): T.APIResponse => {
    try {
      const data = await storage.uploadPostImage(file);
      successResponse.data = data.contents;
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // update Profile
  updateProfile: async (data: T.updateProfileParams): T.APIResponse => {
    try {
      await user.updateProfile(data);
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // update password
  updatePassword: async (data: T.updatePasswordParams): T.APIResponse => {
    try {
      await user.updatePassword(data);
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // destroy account
  destroyAccount: async (id: string): T.APIResponse => {
    try {
      await user.destroyAccount(id);
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // get Review Datas first
  getReviewsFirst: async (): T.APIResponse => {
    try {
      const response = await review.getReviewsFirst();
      successResponse.data = response.contents;
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // get Review Datas for More Button
  getReviewsMore: async (key: string): T.APIResponse => {
    try {
      const response = await review.getReviewsMore(key);
      successResponse.data = response.contents;
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },

  // get User by Id
  getUserById: async (id: string): T.APIResponse => {
    try {
      const response = await user.getUserById(id);
      successResponse.data = response.contents;
      return successResponse;
    } catch (error) {
      return failResponse(error.message);
    }
  },
};

export default api;
