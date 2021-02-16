import axios from 'axios';

/** swr fetcher using axios */
const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetcher;
