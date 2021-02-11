import getFirebase from '../../firebase/firebase';
import db from '../../firebase/db';
import axios from 'axios';
/**
 *  function related to Sign ( Sign-in , Sign-up , Sign-out)
 */

const firebase = getFirebase();

/** transform error code to Korean Message */
const errorExTxt = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용중인 이메일 입니다';
    case 'auth/wrong-password':
      return '잘못된 비밀번호 입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 이메일 입니다.';
    case 'Not verfied':
      return '이메일 인증을 완료해주세요';
    default:
      return '잠시후 다시 시도해주세요';
  }
};

// 받은 authentication 토큰으로 쿠키 생성해주는 함수
export const postUserToken = async (token: string) => {
  const path = '/api/auth';
  const url = process.env.BASE_API_URL + path;
  const data = { token };
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await axios.post(url, data, { headers });
  return response;
};

/** Sign in function  */
export const signIn = async (email: string, password: string) => {
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
    return { isError: false, errorMessage: '' };
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessage
    return { isError: true, errorMessage };
  }
};

export const signUp = async (
  email: string,
  nickname: string,
  password: string
) => {
  try {
    const auth = firebase.auth();
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // data base users collection에 유저 정보 저장
    await db
      .collection('users')
      .doc(userCredential.user.uid)
      .set({ email: email, nickname });
    const user = await auth.currentUser;
    // 확인 이메일 보내기
    await user.sendEmailVerification();
    // signOut
    await signOut();
    return { isError: false, errorMessage: '' };
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessgae
    return { isError: true, errorMessage };
  }
};

export const signOut = async () => {
  try {
    const auth = firebase.auth();
    await auth.signOut();
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessage
    return errorMessage;
  }
};
