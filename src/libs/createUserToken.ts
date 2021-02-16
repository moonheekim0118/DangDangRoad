import axios, { AxiosResponse } from 'axios';

/** create user Token and send Token to create Session Cookie */
const createUserToken = async (
  token: string
): Promise<AxiosResponse<any> | Error> => {
  try {
    const path = '/api/createAuth';
    const data = { token };
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(path, data, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export default createUserToken;
