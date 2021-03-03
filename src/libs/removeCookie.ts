import axios, { AxiosResponse } from 'axios';
import api from 'common/constant/api';

// remove stored Session Cookie for logging out
const removeCookie = async (): Promise<AxiosResponse<any> | Error> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(api.REMOVE_AUTH, { headers }); // remove token
    return response;
  } catch (error) {
    return error;
  }
};

export default removeCookie;
