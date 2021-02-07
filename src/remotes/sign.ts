import firebase from '../../firebase';

/**
 *  function related to Sign ( Sign-in , Sign-up , Sign-out)
 */

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

/** Sign in function  */
export const signIn = async (email: string, password: string) => {
  try {
    const auth = firebase.auth();
    await auth.signInWithEmailAndPassword(email, password);
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
