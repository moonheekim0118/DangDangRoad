import { useEffect, useState } from 'react';
import firebase from '../../firebase';

/** check if it's logged in or not */
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const auth = firebase.auth();
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return isLoggedIn;
};

export default useAuth;
