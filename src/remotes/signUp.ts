import firebase from '../../firebase';

const signUp = async (email, password) => {
  try {
    const auth = firebase.auth();
    const user = await auth.createUserWithEmailAndPassword(email, password);
    return { isError: false, errorMessage: '' };
  } catch (error) {
    const errorMessage =
      error.message ===
      'The email address is already in use by another account.'
        ? '이미 사용중인 이메일 입니다.'
        : '잠시후에 다시 시도해주세요.';
    return { isError: true, errorMessage };
  }
};

export default signUp;
