import axios, { AxiosResponse } from 'axios';

// remove stored Session Cookie for logging out
const removeCookie = async (): Promise<AxiosResponse<any> | Error> => {
  try {
    const path = '/api/removeAuth';
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(path, { headers }); // remove token
    return response;
  } catch (error) {
    return error;
  }
};

export default removeCookie;
