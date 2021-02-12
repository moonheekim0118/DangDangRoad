import axios from 'axios';

const fetcher = (url) => axios.get(url).then((result) => result.data);

export default fetcher;
