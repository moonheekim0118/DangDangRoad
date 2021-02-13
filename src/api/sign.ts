import getFirebase from 'firebaseConfigs/firebase';
import db from 'firebaseConfigs/db';
import errorExTxt from 'util/erreorExTxt';
import axios, { AxiosResponse } from 'axios';
import { ReqResult } from 'types/API';

/**
 *  function related to Sign ( Sign-in , Sign-up , Sign-out)
 */

const firebase = getFirebase();

// authentication Cookie 삭제하기
const removeCookie = async (): Promise<AxiosResponse<any> | Error> => {
  try {
    const path = '/api/removeAuth';
    const url = process.env.BASE_API_URL + path;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, { headers }); // remove token
    return response;
  } catch (error) {
    return error;
  }
};

// 받은 authentication 토큰으로 쿠키 생성해주는 함수
const postUserToken = async (
  token: string
): Promise<AxiosResponse<any> | Error> => {
  try {
    const path = '/api/auth';
    const url = process.env.BASE_API_URL + path;
    const data = { token };
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

/** 유저 정보 firestore에 저장 */
const addUser = async (
  uid: string,
  email: string,
  nickname: string,
  profilePic: string = ''
) => {
  try {
    await db.collection('users').doc(uid).set({ email, nickname, profilePic });
  } catch (error) {
    throw error;
  }
};

/** 구글 로그인 */
export const googleSignIn = async (): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    if (provider) {
      const response = await auth.signInWithPopup(provider);
      // 로그인 완료
      if (response.user) {
        const user = response.user;
        const email = user.email || '';
        const nickname = user.displayName || '';
        const profilePic = user.photoURL || '';
        const token = await user.getIdToken(); // 파이어베이스 사용자 토큰
        const uid = user.uid; // 사용자 uid
        const snapshot = await db.collection('users').doc(uid).get(); // 파이어베이스에 저장된 유저정보인지 확인
        if (!snapshot.exists) {
          // 신규 가입
          await addUser(uid, email, nickname, profilePic);
        }
        await postUserToken(token); // 인증 유지
      }
    }
    return { isError: false };
  } catch (error) {
    // 유저가 auth 창 닫은 경우는 에러로 치지 않는다
    if (error.code === 'auth/popup-closed-by-user') {
      return { isError: false };
    }
    return { isError: true, errorMessage: '잠시후 다시 시도해주세요' };
  }
};

/** Sign in function  */
export const signIn = async (
  email: string,
  password: string
): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    const response = await auth.signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      if (!response.user.emailVerified) {
        // 이메일 인증 여부 확인
        throw { code: 'Not verfied' };
      }
      // 로그인 요청 후 응답에 담긴 토큰 보내기
      const token = await response.user.getIdToken(); // Token
      await postUserToken(token);
    }
    return { isError: false };
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessage
    return { isError: true, errorMessage };
  }
};

export const signUp = async (
  email: string,
  nickname: string,
  password: string
): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // 회원가입 완료
    if (userCredential.user && auth.currentUser) {
      // data base users collection에 유저 정보 저장
      await addUser(userCredential.user.uid, email, nickname);
      const user = await auth.currentUser;
      // 확인 이메일 보내기
      await user.sendEmailVerification();
      // signOut
      await signOut();
    }
    return { isError: false };
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessgae
    return { isError: true, errorMessage };
  }
};

export const signOut = async (): Promise<ReqResult> => {
  try {
    const auth = firebase.auth();
    await auth.signOut();
    await removeCookie(); // remove token
    return { isError: false };
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessage
    return { isError: true, errorMessage };
  }
};
