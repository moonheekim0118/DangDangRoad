import axios, { AxiosResponse } from 'axios';
import api from 'common/constant/api';

/** create user Token and send Token to create Session Cookie */
const createUserToken = async (
  token: string
): Promise<AxiosResponse<any> | Error> => {
  try {
    const data = { token };
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(api.CREATE_AUTH, data, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export default createUserToken;
