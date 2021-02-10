import getFirebase from '../../firebase/firebase';

/**
 *  function related to Sign ( Sign-in , Sign-up , Sign-out)
 */

const firebase = getFirebase();

/** transform error code to Korean Message */
const errorExTxt = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용중인 이메일 입니다';
    case 'auth/wrong-password':
      return '잘못된 비밀번호 입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 이메일 입니다.';
    default:
      return '잠시후 다시 시도해주세요';
  }
};

// 받은 authentication 토큰으로 쿠키 생성해주는 함수
export const postUserToken = async (token) => {
  const path = '/api/auth';
  const url = process.env.BASE_API_URL + path;
  const data = { token: token };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

/** Sign in function  */
export const signIn = async (email: string, password: string) => {
  try {
    const auth = firebase.auth();
    const response = await auth.signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      // 로그인 요청 후 응답에 담긴 토큰 보내기
      await postUserToken(await response.user.getIdToken());
    }
    return { isError: false, errorMessage: '' };
  } catch (error) {
    const errorMessage = errorExTxt(error.code); // get Correct ErrorMessage
    return { isError: true, errorMessage };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const auth = firebase.auth();
    await auth.createUserWithEmailAndPassword(email, password);
    const user = await auth.currentUser;
    await user.sendEmailVerification();
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
