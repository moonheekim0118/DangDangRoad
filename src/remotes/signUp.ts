import firebase from '../../firebase';

const signUp = (email, password) => {
  try {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
};

export default signUp;
