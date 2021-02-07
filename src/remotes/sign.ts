import firebase from '../../firebase';

const errorExTxt = (errorCode) => {
  let result = '';
  switch (errorCode) {
    case 'auth/email-already-in-use':
      result = '이미 사용중인 이메일 입니다';
      return result;
    case 'auth/wrong-password':
      result = '잘못된 비밀번호 입니다.';
      return result;
    case 'auth/user-not-found':
      result = '존재하지 않는 이메일 입니다.';
      return result;
    default:
      result = '잠시후 다시 시도해주세요';
      return result;
  }
};

export const signIn = async (email, password) => {
  try {
    const auth = firebase.auth();
    await auth.signInWithEmailAndPassword(email, password);
    return { isError: false, errorMessage: '' };
  } catch (error) {
    console.log(error);
    const errorMessage = errorExTxt(error.code);
    return { isError: true, errorMessage };
  }
};

export const signUp = async (email, password) => {
  try {
    const auth = firebase.auth();
    await auth.createUserWithEmailAndPassword(email, password);
    const user = await auth.currentUser;
    await user.sendEmailVerification();
    await signOut();
    return { isError: false, errorMessage: '' };
  } catch (error) {
    const errorMessage = errorExTxt(error.code);
    return { isError: true, errorMessage };
  }
};

export const signOut = async () => {
  try {
    const auth = firebase.auth();
    await auth.signOut();
  } catch (error) {
    const errorMessage = errorExTxt(error.code);
    return errorMessage;
  }
};
