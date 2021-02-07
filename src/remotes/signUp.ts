import firebase from '../../firebase';

const errorExTxt = (errorCode) => {
  let result = '';
  switch (errorCode) {
    case 'auth/email-already-in-use':
      result = '이미 사용중인 이메일 입니다';
      return result;
    default:
      result = '잠시후 다시 시도해주세요';
      return result;
  }
};

const signUp = async (email, password) => {
  try {
    const auth = firebase.auth();
    await auth.createUserWithEmailAndPassword(email, password);
    const user = await auth.currentUser;
    await user.sendEmailVerification();
    return { isError: false, errorMessage: '' };
  } catch (error) {
    console.log(error.message);
    const errorMessage = errorExTxt(error.code);
    return { isError: true, errorMessage };
  }
};

export default signUp;
