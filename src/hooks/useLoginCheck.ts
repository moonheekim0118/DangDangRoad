import { useEffect } from 'react';
import { useLoginInfoDispatch } from 'context/LoginInfo';
import axios from 'axios';

/**
 *  change isLoggedIn state in Context
 *  by parameter authenticated
 */

const useLoginCheck = () => {
  const dispatch = useLoginInfoDispatch();
  useEffect(() => {
    const path = '/api/checkAuth';
    const url = process.env.BASE_API_URL + path;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        if (data.authenticated) {
          dispatch({ type: 'login', data: data.userId });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
};

export default useLoginCheck;
